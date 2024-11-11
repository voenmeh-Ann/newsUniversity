let flag = 0; 
let flagNext = 0;
const mails = [];
function addInputsEnter()
{
      flagNext = 0;
      let numberOfInputs = 2;
      let container = document.getElementById('inputContainer'); // Это место для новых полей
      let names = ["Логин", "Пароль"];
      while (container.hasChildNodes()) 
      { 
        container.removeChild(container.lastChild); // Освобождаем место от старых элементов
      }

      for (let i = 0; i < numberOfInputs; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.name = `dynamicInput${i}`; // Имена для каждого поля для избежания ошибок
        input.placeholder = names[i];
        container.appendChild(input); // Добавляем новое поле в контейнер
        container.appendChild(document.createElement('br')); // Предусматриваем дополнительное пространство между полями

      }
      flagNext = 1;
      flag = (flag) ? 0 : 1;
      showButton();
}

function addInputsReg()
{
      flagNext = 0;
      let numberOfInputs = 5;
      let container = document.getElementById('inputContainer'); // Это место для новых полей
      let names = ["Имя", "Фамилия", "Дата рождения", "Логин", "Пароль"];
      while (container.hasChildNodes()) 
      { 
        container.removeChild(container.lastChild); // Освобождаем место от старых элементов
      }
      
      for (let i = 0; i < numberOfInputs; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.name = `dynamicInput${i}`; // Имена для каждого поля для избежания ошибок
        input.placeholder = names[i];
        container.appendChild(input); // Добавляем новое поле в контейнер
        container.appendChild(document.createElement('br')); // Предусматриваем дополнительное пространство между полями
      }
      flagNext = 1;
      flag = (flag) ? 0 : 1;
    
      showButton();
}

function showButton()
{
    if(flagNext == 0)
    {
        document.getElementById('next').style.display="none";
    }
    else
    {
        document.getElementById('next').style.display="block";
    }
    
    if(flag == 0)
    {
        document.getElementById('inputContainer').style.display="none";
        document.getElementById('next').style.display="none";
    }
    else
    {
        document.getElementById('inputContainer').style.display="block";
    }
    
}

function clickButton()
{
    let container = document.getElementById('inputContainer');
    let inputs = container.getElementsByTagName('input'); // Получаем все input элементы в контейнере
    let inputValues = {};

    // Проходим по всем input и собираем их значения
    for (let i = 0; i < inputs.length; i++) {
        let inputName = inputs[i].name;
        let inputValue = inputs[i].value;
        inputValues[inputName] = inputValue; // Заполняем объект значениями полей
    }

    container.style.display = "none";
    document.getElementById('next').style.display="none";
    flag = 0; flagNext = 0;
    if(inputs.length === 2)
    {
        if (!inputValues.dynamicInput0 || !isValidEmail(inputValues.dynamicInput0)) 
        {
            console.log('2');
            alert("Пожалуйста, введите корректный email.");
            return;
        }
    }
    if(inputs.length === 5)
    {
        console.log('5');

        // Проверка формата даты рождения (например, "YYYY-MM-DD")
        if (inputValues.dynamicInput2 && !isValidDate(inputValues.dynamicInput2)) 
        {
            alert("Пожалуйста, введите корректную дату рождения.");
            return;
        }
        // Проверяем данные перед отправкой (например, проверка email и даты)
        if (!inputValues.dynamicInput3 || !isValidEmail(inputValues.dynamicInput3)) 
        {
            alert("Пожалуйста, введите корректный email.");
            return;
        }
    }

    let url = (inputs.length === 2) ? "login_form.php" : "submit_form.php";  // Разные скрипты для входа и регистрации

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues)
    })
    .then(response => response.json())  // Обрабатываем ответ от сервера
    .then(data => 
    {
        if (data.success) 
        {
            console.log('Данные успешно сохранены');
            alert(data.message);

            if(data.redirect)
            {
                window.location.href = data.redirect;
            }
        } 
        else 
        {
            console.log('Ошибка при отправке данных:', data.message);
            alert(`Ошибка: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке данных:', error);
        alert('Произошла ошибка при отправке данных');
    });
}

// Функция для проверки email
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Функция для проверки даты в формате YYYY-MM-DD
function isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
}
