<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>Configuración • Estanciero</title>
</svelte:head>

<div class="settings-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Tu Configuración</h1>

				<ListErrors errors={form?.errors} />

				<form
					use:enhance={() => {
						return ({ update }) => {
							// don't clear the form when we update the profile
							update({ reset: false });
						};
					}}
					method="POST"
					action="?/save"
				>
					<fieldset>
						<fieldset class="form-group">
							<input
								class="form-control"
								name="image"
								type="text"
								placeholder="URL de la foto de perfil"
								value={data.user.image}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="username"
								type="text"
								placeholder="Nombre de usuario"
								value={data.user.username}
							/>
						</fieldset>

						<fieldset class="form-group">
							<textarea
								class="form-control form-control-lg"
								name="bio"
								rows="8"
								placeholder="Breve información acerca de ti"
								value={data.user.bio}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="email"
								type="email"
								placeholder="Email"
								value={data.user.email}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="password"
								type="password"
								placeholder="Nueva contraseña"
							/>
						</fieldset>

						<button class="btn btn-lg btn-primary pull-xs-right">Actualizar Configuración</button>
					</fieldset>
				</form>

				<hr />

				<form use:enhance method="POST" action="?/logout">
					<button class="btn btn-outline-danger">Presione aquí para cerrar sesión.</button>
				</form>
			</div>
		</div>
	</div>
</div>
