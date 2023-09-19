document.addEventListener('DOMContentLoaded', function () {

    var inputName = document.getElementById('form-field-name');
    var valueName;
    var inputUsername = document.getElementById('form-field-username_api');
    var valueUsername;
    var inputEmail = document.getElementById('form-field-email_api');
    var valueEmail;
    var inputTelefone = document.getElementById('form-field-telefone');
    var valueTelefone;

    inputName.addEventListener('input', function () {
        valueName = inputName.value;
    });
    inputUsername.addEventListener('input', function () {
        valueUsername = inputUsername.value;
    });

    inputEmail.addEventListener('input', function () {
        valueEmail = inputEmail.value;
    });
    inputTelefone.addEventListener('input', function () {
        valueTelefone = inputTelefone.value;
    });


    // Event listener para a submissão do formulário
    document.getElementById('btn_api').addEventListener('click', function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        console.log('CLICANDO BOTÃO', inputUsername.value);

        // Formata os dados do formulário para o formato desejado
        var new_data = {
            username: valueUsername,
            nickname: valueUsername,
            birthdate: '2000-01-01',
            club: 32442,
            email: valueEmail
        };

        // Cria um objeto XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Configura a solicitação POST para a API remota
        xhr.open('POST', 'https://homologacao.sxgrupo.com.br/api/sx-suprema/register_player_slot', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'ubUjHPeaPXgdcWMz7luKfSF5xP49X3');

        // Define a função de retorno de chamada para manipular a resposta da API
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Manipule a resposta da API, se necessário
                var response = JSON.parse(xhr.responseText);
                console.log(response);

                //Caso email já exista
                if (response.includes('email account exists')) {

                    //Destacar campo email
                    var inputError = document.getElementById('form-field-email_api');
                    inputError.placeholder = 'Email já cadastrado';
                    inputError.style.border = '2px solid red';
                    inputError.style.background = 'rgb(255,0,0,0.05)';
                    inputError.style.color = 'red';

                    //Preencher os valores
                    console.log(valueName, valueUsername, valueTelefone);
                    inputName.value = valueName;
                    inputUsername.value = valueUsername;
                    inputTelefone.value = valueTelefone;

                    //Mensagem de erro abaixo do formulário
                    var errorMessage = document.getElementById('error_message');
                    errorMessage.innerText = '*Email já cadastrado. Tente outro endereço de email para prosseguir.';

                }
                //caso email não exista
                else {
                    document.location.href = 'https://sxpokers.com.br/generica-v1-api-tp/?preview_id=306&preview_nonce=8f5561b110&preview=true';
                }
            }

            else {
                // Trate erros
                console.alert('Erro' + response + '. Tente novamente.');
            }
        };

        // Trata erros de rede
        xhr.onerror = function () {
            console.error('Erro de rede ao fazer a solicitação para a API.');
        };

        // Envia a solicitação com os dados do formulário no formato JSON
        xhr.send(JSON.stringify(new_data));
    });

});
