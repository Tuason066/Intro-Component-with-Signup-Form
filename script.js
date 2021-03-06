/* CODED BY: JEFFREY TUASON */

const form = document.querySelector('#form');
const inputFields = document.querySelectorAll('#input-fields');

form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmitForm(e.currentTarget);
});

// this will check the input value during filling in if it is undefined or valid
const validateFieldOnType = () => {
    inputFields.forEach(field => {
        const container = field.querySelector('.input-container');
        const input = field.querySelector('input');
        const errorMessage = field.querySelector('#error');
        const errorIcon = field.querySelector('#error-icon');
        // console.log(errorIcon.classList.remove('hidden'));
        console.log(errorIcon);
        // capitalize the first letter of the word
        const inputName = input.id.split('-');
        const arr = [];
        for(let i = 0; i < inputName.length; i++) {
            arr.push(inputName[i].charAt(0).toUpperCase() + inputName[i].slice(1))
        }
        const word = arr.join(' ');
        // end here ^
        if(input.id !== 'email') {
            input.addEventListener('input', () => {
                if(input.value === '') {
                    container.classList.add('error-input-field')
                    errorMessage.textContent = `${word} cannot be empty`;
                    errorIcon.classList.remove('hidden');
                } else {
                    container.classList.remove('error-input-field')
                    errorMessage.textContent = '';
                    errorIcon.classList.add('hidden');
                }
            });
        } else {

            input.addEventListener('input', () => {
            const test = /^[\w]+[@][\w]+[\.][a-z]{2,3}$/.test(input.value);
            if(test) {
                    container.classList.remove('error-input-field');
                    errorMessage.textContent = '';
                    errorIcon.classList.add('hidden');
                }
            })

            input.addEventListener('focusout', () => {
                const test = /^[\w]+[@][\w]+[\.][a-z]{2,3}$/.test(input.value);
                if(!test) {
                    container.classList.add('error-input-field')
                    errorMessage.textContent = 'Looks like this is not an email';
                    errorIcon.classList.remove('hidden');
                }
            })
        }
    })
}
validateFieldOnType();

// this will check if the input is undefined (user did not filled up the form even click)
const onSubmitForm = (form) => {
    let switchForm = 0;
    
    inputFields.forEach(field => {
        const container = field.querySelector('.input-container');
        const input = field.querySelector('input');
        const errorMessage = field.querySelector('#error');
        const errorIcon = field.querySelector('#error-icon');
        // capitalize the first letter of the word
        const inputName = input.id.split('-');
        const arr = [];
        for(let i = 0; i < inputName.length; i++) {
            arr.push(inputName[i].charAt(0).toUpperCase() + inputName[i].slice(1))
        }
        const word = arr.join(' ');
        // end here ^
        if(input.value === '') {
            container.classList.add('error-input-field');
            errorMessage.textContent = `${word} cannot be empty`;
            errorIcon.classList.remove('hidden');
        } else if (input.id === 'email') {
            const test = /^(\w+)(@[\w]+[\.][\w]{2,3})$/.test(input.value);
            if(test) {
                container.classList.remove('error-input-field');
                errorMessage.textContent = '';
                errorIcon.classList.add('hidden');
                switchForm++;
            } else {
                container.classList.add('error-input-field');
                errorMessage.textContent = 'Looks like this is not an email';
                errorIcon.classList.remove('hidden');
            }
        } else {
            container.classList.remove('error-input-field');
            errorMessage.textContent = '';
            errorIcon.classList.add('hidden');
            switchForm++;
        }
    })

    switchForm >= 4 && form.submit()
}