<script context="module">
    
</script>

<script>
    
    import SearchBar from '$lib/components/searchBar.svelte'
    import MenuIcon from '$lib/components/menuIcon.svelte'
    export let active;
    export let email;
</script>
<style>
    .header{
        display:flex;
        flex-direction: row;
        position: fixed;
        min-width: auto;
        box-shadow: var(--bs-sm);
        top: 0;
        left: 0;
        width: 100%;
        z-index: 5050;
        background-color: #222;
        height: var(--header-height);
        justify-content: space-between;
    }
    h1{
        color: white
    }

    .avatar {
        cursor: pointer;
        position: relative;
        vertical-align: middle;
        top: 5px;
        right: 1%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>


<header class="header">
      
    <MenuIcon {active}/>
    <h1>{email}</h1>
    <SearchBar/>
    <div class="messageicon" event-message-click>   
        <img src="../../static/messageicon.png"  alt="Avatar" class="avatar-img" >
    </div>
    <div class="avatar" event-avatar-click>   
        <img src="../../static/Profileicon.png"  alt="Avatar" class="avatar-img" >
    </div>
    <div class="avatar-dropdown" data-avatar-dropdown>
        <ul>
        </ul>
    </div>
</header>