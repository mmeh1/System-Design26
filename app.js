import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const getSupabaseConfig = () => {
  const config = window.__SUPABASE_CONFIG__ || {};
  return {
    url: String(config.url || '').trim(),
    anonKey: String(config.anonKey || config.key || '').trim(),
  };
};

const normalizeService = (row = {}) => ({
  id: String(row.id || row.slug || '').trim(),
  name: String(row.name || row.title || '').trim(),
  description: String(row.description || '').trim(),
  category: String(row.category || 'Support service').trim(),
  imageUrl: String(row.image_url || row.imageUrl || '').trim(),
  location: String(row.location || '').trim(),
});

const normalizeServices = (data = []) =>
  data
    .map((row) => normalizeService(row))
    .filter((item) => item.id && item.name);

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
    });

    const authState = Vue.reactive({
      user: null,
      isConfigured: false,
      isLoading: false,
      message: 'Supabase is not configured yet. Using the sample CSV data for now.',
    });

    const { url, anonKey } = getSupabaseConfig();
    const supabase = url && anonKey && window.supabase
      ? window.supabase.createClient(url, anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
          },
        })
      : null;

    if (supabase) {
      authState.isConfigured = true;
      authState.message = 'Supabase is connected.';
      supabase.auth.getSession().then(({ data }) => {
        authState.user = data.session?.user || null;
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        authState.user = session?.user || null;
      });
    }

    const loadCsvData = async () => {
      const response = await fetch('items-template.csv');
      if (!response.ok) {
        throw new Error('Could not load CSV data file.');
      }

      const csvText = await response.text();
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors }) => {
            if (errors.length > 0) {
              reject(new Error('There was a problem reading the CSV data.'));
              return;
            }

            itemsStore.items = normalizeServices(data);
            itemsStore.error = '';
            resolve();
          },
          error: () => {
            reject(new Error('There was a problem parsing CSV data.'));
          },
        });
      });
    };

    const loadSupabaseData = async () => {
      if (!supabase) {
        return null;
      }

      const { data, error } = await supabase.from('services').select('*').order('name');
      if (error) {
        throw error;
      }

      const services = normalizeServices(data);
      if (services.length > 0) {
        itemsStore.items = services;
        itemsStore.error = '';
      }
      return services;
    };

    const loadItems = async () => {
      itemsStore.isLoading = true;

      try {
        if (supabase) {
          const services = await loadSupabaseData();
          if (services && services.length > 0) {
            return;
          }
          authState.message = 'Supabase is configured but the services table is empty. Using the sample CSV data instead.';
        }

        await loadCsvData();
      } catch (error) {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
      } finally {
        itemsStore.isLoading = false;
      }
    };

    const signIn = async (email) => {
      if (!supabase) {
        authState.message = 'Add a real Supabase URL and anon key to enable sign-in.';
        return false;
      }

      authState.isLoading = true;
      try {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
          authState.message = error.message;
          return false;
        }
        authState.message = 'Check your email for the sign-in link.';
        return true;
      } finally {
        authState.isLoading = false;
      }
    };

    const signOut = async () => {
      if (!supabase) {
        authState.message = 'Supabase is not configured yet.';
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        authState.message = error.message;
        return;
      }
      authState.user = null;
      authState.message = 'You are signed out.';
    };

    Vue.provide('itemsStore', itemsStore);
    Vue.provide('authState', authState);
    Vue.provide('supabaseAuth', { signIn, signOut });

    loadItems();

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
