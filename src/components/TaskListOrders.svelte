<script>

   	export let param, order

function changeSort() {
	param = document.querySelector('input[name="orderByRadios"]:checked').value
}
function orderByIndian() {
	order = document.querySelector('input[name="orderByIndian"]:checked').value
}

</script>


<div class="row">
	<div class="col-auto">
		Order by:
		<div class="form-check mx-3 form-check-inline">
			<input class="form-check-input" type="radio" name="orderByRadios" id="orderByRadios1" value="sort_order" checked  on:click={changeSort}>
			<label class="form-check-label" for="orderByRadios1">
			  Sort order
			</label>
		  </div>
		  <div class="form-check  form-check-inline">
			<input class="form-check-input" type="radio" name="orderByRadios" id="orderByRadios2" value="id"  on:click={changeSort}>
			<label class="form-check-label" for="orderByRadios2">
			  id
			</label>
		  </div>
		  <div class="form-check  form-check-inline">
			<input class="form-check-input" type="radio" name="orderByRadios" id="orderByRadios3" value="title"  on:click={changeSort}>
			<label class="form-check-label" for="orderByRadios3">
			  title
			</label>
		  </div>
		  <div class="form-check  form-check-inline">
			<input class="form-check-input" type="radio" name="orderByRadios" id="orderByRadios4" value="public"  on:click={changeSort}>
			<label class="form-check-label" for="orderByRadios4">
			  public
			</label>
		  </div>
	</div>

	<div class="col-auto ms-auto">
		
		Order direction: 
		<div class="mx-3 form-check  form-check-inline">
		  <input class="form-check-input" type="radio" name="orderByIndian" id="orderByIndian" value="asc" checked on:click={orderByIndian}>
		  <label class="form-check-label" for="orderByIndian">
			asc
		  </label>
		</div>
		<div class="form-check  form-check-inline">
		  <input class="form-check-input" type="radio" name="orderByIndian" id="orderByIndian2" value="desc"  on:click={orderByIndian}>
		  <label class="form-check-label" for="orderByIndian2">
			desc
		  </label>
		</div>
	</div>
</div>

<style>
</style>

