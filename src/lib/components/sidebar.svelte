<script>
    
    export let active;
</script>

<style>
.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.sidebar{
    position: fixed;
    overflow-x: hidden;
    margin-top: var(--header-height);
    flex-shrink: 0;
    width: 0;
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
    overflow-x: hidden;
    background: #095776;
    transition: width var(--sidebar-animation-time) var(--sidebar-animation-curve);
}
.sidebar.open{
  width: var(--sidebar-width);
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

.mb-auto {
    margin-bottom: auto!important;
}
.flex-column {
    flex-direction: column!important;
}
.nav-pills .nav-link {
    background: 0 0;
    border: 0;
    border-radius: 0.25rem;
}
.text-white {
    --bs-text-opacity: 1;
    color: #fff !important;
}

.nav-link {
    display: block;
    padding: 0.5rem 1rem;
    color: #0d6efd;
    text-decoration: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
}
.nav-link:hover {
  background: linear-gradient(to right, #095776, #8EB5CD);
}
</style>



<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
<aside class:open={active} class="sidebar" data-sidebar>  
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/" class="nav-link text-white  " aria-current="page" style="display: flex;">
          <span class="bi bi-house" style="padding-right: 10px" ></span>
          Página Incial
        </a>
      </li>
      <li>
        <a href="/user/exercises" class="nav-link text-white" style="display: flex;">
          <span class='bi bi-bicycle'  style="padding-right: 10px"></span>              
          Exercícios
        </a>
      </li>
      <li>
        <a href="/user/plans" class="nav-link text-white" style="display: flex;">
          <span class='bi bi-collection-play' style="padding-right: 10px"></span>
          Planos
        </a>
      </li>
      <li>
        <a href="/user/clients" class="nav-link text-white " style="display: flex;">
          <span class='bi bi-people-fill' style="padding-right: 10px"></span>
          Clientes
        </a>
      </li>
    </ul>
  </aside>