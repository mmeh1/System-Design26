export default {
  name: 'landing-page-component',
  template: /* html */ `
    <section class="container py-5">
      <div class="row align-items-center">
        <div class="col-12 col-lg-8">
          <p class="text-uppercase small fw-semibold text-primary mb-2">Health and wellness waiver</p>
          <h1 class="mb-3">Support for everyday living</h1>
          <p class="lead text-secondary mb-4">
            Explore waiver programs that may support you or someone you care for at home and in the community.
          </p>
          <p class="mb-4">
            Learn about Home and Community, Structured Family Care, and Attendant Care. Service availability and eligibility vary; the provider can help explain possible next steps.
          </p>
          <router-link to="/items" class="btn btn-primary">
            <i class="bi bi-list-check me-1" aria-hidden="true"></i>Explore services
          </router-link>
        </div>
      </div>
    </section>
  `,
};
