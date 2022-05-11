<script>
	export let toastEl,
		opc = { text: "", color: "" },
		mostrarMensaje;

	// toast notify
	import { Toast } from "bootstrap";

	mostrarMensaje = (text, color) => {
		opc = {
			text: text,
			color: color,
		};
		new Toast(toastEl).show();
	};
</script>

<div class="toast-container position-absolute top-0 end-0 p-3">
	<div
		bind:this={toastEl}
		class="toast align-items-center text-dark bg-{opc.color}"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	>
		<div class="d-flex">
			<div class="toast-body">{opc.text}</div>
			<button
				type="button"
				class="btn-close me-2 m-auto"
				data-bs-dismiss="toast"
				aria-label="Close"
			/>
		</div>
	</div>
</div>

<style>
</style>
