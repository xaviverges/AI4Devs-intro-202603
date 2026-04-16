// Lógica para invertir cadena y gestionar accesibilidad y caracteres especiales
function reverseString(str) {
	if (!str) return '';
	return Array.from(str).reverse().join('');
}

document.addEventListener('DOMContentLoaded', function () {
	const input = document.getElementById('inputText');
	const result = document.getElementById('resultText');
	const btn = document.getElementById('invertBtn');
	const alert = document.getElementById('alert');
	const copyBtn = document.getElementById('copyBtn');

	// Foco en el input al cargar
	input.focus();

	// Evitar pegar HTML o JS (solo texto plano)
	input.addEventListener('paste', function (e) {
		e.preventDefault();
		const text = (e.clipboardData || window.clipboardData).getData('text/plain');
		document.execCommand('insertText', false, text.replace(/[<>]/g, ''));
	});


	// Limpiar resultado, alerta y deshabilitar copiar al modificar entrada
	input.addEventListener('input', function () {
		result.value = '';
		alert.textContent = '';
		copyBtn.disabled = true;
	});


	btn.addEventListener('click', function () {
		let value = input.value || '';
		if (!value) {
			result.value = '';
			alert.textContent = 'Por favor, introduzca un texto.';
			copyBtn.disabled = true;
			return;
		}
		alert.textContent = '';
		let reversed = reverseString(value);
		result.value = reversed;
		copyBtn.disabled = reversed.length === 0;
	});

	// Permitir Enter para invertir
	input.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			btn.click();
		}
	});

	// Copiar resultado
	copyBtn.addEventListener('click', function () {
		if (!copyBtn.disabled && result.value) {
			navigator.clipboard.writeText(result.value).then(() => {
				alert.textContent = '¡Resultado copiado!';
				setTimeout(() => { alert.textContent = ''; }, 1500);
			});
		}
	});
});

