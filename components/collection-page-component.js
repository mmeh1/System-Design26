export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');

    return {
      itemsStore,
    };
  },
  template: /* html */ `
    <section class="container py-4 py-lg-5 services-page">
      <header class="services-header p-4 p-md-5 mb-4 mb-lg-5">
        <p class="eyebrow mb-2">Health and wellness waiver</p>
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 class="h1 mb-2">Services</h1>
            <p class="lead mb-0">Explore support options for individuals and the people who care for them.</p>
            <p class="age-guideline mb-0 mt-3">Who may be eligible: people aged 59 or younger.</p>
          </div>
          <span class="service-count">{{ itemsStore.items.length }} services</span>
        </div>
      </header>

      <div class="alert services-note mb-4" role="note">
        Service availability and eligibility depend on your situation and location. Contact the provider to confirm what may be right for you.
      </div>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading services...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
        No services are available to show right now.
      </div>

      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in itemsStore.items" :key="item.id">
          <article class="card service-card h-100">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              class="card-img-top collection-card-image object-fit-cover" />
            <div
              v-else
              class="collection-card-image service-image-placeholder d-flex align-items-center justify-content-center">
              <i class="bi bi-heart-pulse" aria-hidden="true"></i>
              <span class="visually-hidden">{{ item.name }} service</span>
            </div>

            <div class="card-body d-flex flex-column">
              <div class="mb-2">
                <span class="service-category">{{ item.category || 'Support service' }}</span>
                <h2 class="h5 card-title mb-0">{{ item.name }}</h2>
              </div>

              <p class="card-text text-secondary flex-grow-1 collection-description">
                {{ item.description || 'No description available.' }}
              </p>

              <div class="d-grid">
                <router-link :to="'/items/' + item.id" class="btn btn-primary">
                  {{ item.id === 'care-coordination' ? 'View more information' : 'View service details' }}
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
