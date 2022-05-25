<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="~/assets/img/logo.png" />
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <NuxtLink to="/" class="navbar-item">Home</NuxtLink>
        <a class="navbar-item">How It Works</a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless">Admin Portal</a>
          <div class="navbar-dropdown">
            <NuxtLink to="/admin" class="navbar-item">Home</NuxtLink>
            <NuxtLink to="/admin/accounts" class="navbar-item">Accounts</NuxtLink>
            <a class="navbar-item" routerLink="admin/transactions">Transactions</a>
            <a class="navbar-item">Lists</a> 
          </div>
        </div>

        <a class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">My Account</a>
          </div>
        </a>
      </div>
    </div>
  </nav>
</template>