<script>
	import { page } from '$app/stores';
</script>

<nav class="navbar navbar-light">
	<div class="container">
		<a class="navbar-brand" href="/">Estanciero</a>
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<a class="nav-link" class:active={$page.url.pathname === '/'} href="/">Inicio</a>
			</li>

			{#if $page.data.user}
				<li class="nav-item">
					<a href="/editor" class="nav-link" class:active={$page.url.pathname === '/editor'}>
						<i class="ion-compose" />&nbsp;Nueva publicación
					</a>
				</li>

				<li class="nav-item">
					<a href="/settings" class="nav-link" class:active={$page.url.pathname === '/settings'}>
						<i class="ion-gear-a" />&nbsp;Configuración
					</a>
				</li>

				<li class="nav-item">
					<a href="/profile/@{$page.data.user.username}" class="nav-link">
						{$page.data.user.username}
					</a>
				</li>
			{:else}
				<li class="nav-item">
					<a href="/login" class="nav-link" class:active={$page.url.pathname === '/login'}>
						Iniciar sesión
					</a>
				</li>

				<li class="nav-item">
					<a href="/register" class="nav-link" class:active={$page.url.pathname === '/register'}>
						Registrarse
					</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>
