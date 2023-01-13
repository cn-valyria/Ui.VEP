<template>
  <div>
    <section class="hero is-medium is-dark">
      <div class="hero-body has-text-centered" style="padding-bottom: 4.5rem">
        <p class="title">Valyrian Exchange Program</p>
        <p class="subtitle">
          Fully managed CN tech dealing
        </p>
      </div>
    </section>
    <div class="container has-text-centered">
      <img id="dragons-illustration" src="~/assets/img/dragons-illustration.png" />
    </div>
    <div class="container">
      <div class="section">
        <div class="is-size-3 has-text-weight-semibold has-text-centered mb-6">
          Manage your account's VEP balance
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-three-fifths">
            <div class="box" style="padding: 0">
              <figure class="image">
                <img src="~/assets/img/account-example.png" />
              </figure>
            </div>
          </div>
          <div class="column">
            <div class="content">
              <h3>Some sort of explanation goes here</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus in hac habitasse platea. Purus non enim praesent elementum. Varius duis at consectetur lorem donec massa.
              </p>
              <p>
                Semper risus in hendrerit gravida rutrum quisque non tellus. Tincidunt vitae semper quis lectus nulla at volutpat. Mauris sit amet massa vitae tortor condimentum lacinia. Est sit amet facilisis magna etiam. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Sed viverra ipsum nunc aliquet bibendum enim. Tellus elementum sagittis vitae et leo duis ut. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Id ornare arcu odio ut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img#dragons-illustration {
  width: 375px;
  margin-top: -2rem;
}
</style>

<script>
export default {
  name: 'IndexPage',
  auth: false
}
</script>
