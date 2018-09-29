'use strict';

class Form {
	constructor(field, template, error) {
		this.field = field;
		this.template = template;
		this.error = error;
		this.success = true;
	}

	validateForm() {
		let fieldVal = this.field.value;

		if (!fieldVal.match(this.template)) {
			this.success = false;
			this.field.value = '';
			this.error.style.display = 'block';
			this.field.classList.add('feedback__fieldBorderError');

			setTimeout(() => {
				this.error.style.display = 'none';
				this.field.classList.remove('feedback__fieldBorderError');
			}, 5000);
		}
	}

	showResult() {
		if (this.success) {
			document.getElementById('feedback__success').style.display = 'block';
		}
	}
}

document.getElementById('btnSubmit').onclick = function() {

	let feedBackEmail = document.getElementById('feedback__email');
	let templateEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	let errorEmail = document.getElementById('feedback__errorEmail');

	let validateEmail = new Form(feedBackEmail, templateEmail, errorEmail);

	validateEmail.validateForm();
	
	validateEmail.showResult();
};