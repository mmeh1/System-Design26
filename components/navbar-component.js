export default {
  name: 'navbar-component',
  template: /* html */ `
    <nav class="navbar sticky-top bg-white border-bottom px-3 site-nav" aria-label="Main navigation">
      <router-link class="navbar-brand mb-0" to="/">
        <img src="./bow.jpg" alt="" class="site-logo me-2" />
        <span>Wellness Waiver Support</span>
      </router-link>

      <div class="ms-auto d-flex gap-2 site-nav-links">
        <router-link class="btn btn-outline-primary btn-sm" to="/">
          <i class="bi bi-house me-1"></i>Home
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
          <i class="bi bi-heart-pulse me-1"></i>Services
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          <i class="bi bi-info-circle me-1"></i>About
        </router-link>
      </div>
    </nav>
  `,
};
