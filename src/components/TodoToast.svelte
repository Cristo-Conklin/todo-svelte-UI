<script>
	// toast notify
	import { Toast } from "bootstrap";

	export let toast = {
		el: "",
		opc: { text: "", color: "" },
		mostrarMensaje: (text, color) => {
			toast.opc = {text, color}
			new Toast(toast.el, toast.opc).show();
		},
	};

	$: classToast = toast.opc.color ? "show bg-" + toast.opc.color : ""
</script>

<div class="toast-container position-absolute top-0 end-0 p-3">
	<div
		bind:this={toast.el}
		class="toast align-items-center text-dark {classToast}"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	>
		<div class="d-flex">
			<div class="toast-body">{toast.opc.text}</div>
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
