<script>
	let fecha;
	let hora;
	let descripcion;

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		fecha = formData.get('fecha');
		hora = formData.get('hora');
		descripcion = formData.get('descripcion');

		if (fecha && hora && descripcion) {
			console.log('Fecha:', fecha);
			console.log('Hora:', hora);
			console.log('Descripción:', descripcion);
			closeModal();
		}
	}

	function closeModal() {
		const modalCheckbox = document.getElementById('my-modal-3');
		modalCheckbox.checked = false;
	}
</script>

<div class="pl-64">
	<form on:submit={handleSubmit}>
		<h1 class="title">Schedule an appointment</h1>
		<div class="form-control">
			<label class="label">Fecha:</label>
			<input class="input" type="date" name="fecha" required />
		</div>
		<div class="form-control">
			<label class="label">Hora:</label>
			<input class="input" type="time" name="hora" required />
		</div>
		<div class="form-control">
			<label class="label">Descripción:</label>
			<textarea class="textarea" name="descripcion" rows="4" />
		</div>
		<button type="submit" class="btn btn-primary">Schedule</button>
	</form>
</div>

<style>
	@import '$lib/utility/appointmentForm.css';
</style>
