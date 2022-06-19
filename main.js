//Событие изменения содержимого в инпуте
document.getElementById("elastic").oninput = function () {
  //Мы получаем вводимое значение с обрезанием пробелов у вводимых данных
  let val = this.value.trim();

  //Получаем все элементы данных
  let elasticItems = document.querySelectorAll(".elastic li");

  //Если вводимое значение не равно пустой строке, то
  if (val != "") {
    //Перебираем все элементы
    elasticItems.forEach((el) => {
      //Если текст внутри элемента (Чистый текст без тегов) совпадает с вводимым нами текстом в инпут и равно -1 (Что б искал везде), без равенства - что бы с самого начала букв проверял.
      if (el.innerText.search(val) == -1) {
        //Тогда мы добавляем класс hide (display: none)
        el.classList.add("hide");

        //У тех элементов которые я скрываю очищаю содержимое тегов
        el.innerHTML = el.innerText;
      } else {
        //Иначе мы удаляем класс hide (display: none)
        el.classList.remove("hide");

        //Получаем чистый текст совпавших нами элементов
        let str = el.innerText;

        //Перезаписываем сам текст уже с учетом новых тегов span (innerHTML), передаем в функцию совпавшие элементы, позицию, где мы нашли элементы и длинну нашей строки
        el.innerHTML = insertMark(str, el.innerText.search(val), val.length);
      }
    });
  } else {
    //Иначе если пользователь ничего не ввел, пустое. То перебираем все элементы
    elasticItems.forEach((el) => {
      //Удаляем класс hide (display: none)
      el.classList.remove("hide");

      //У тех элементов которые я скрываю очищаю содержимое тегов
      el.innerHTML = el.innerText;
    });
  }
};

//Функия подкрашивания, (добавления span), получаем 1 - совпавшие элементы, 2 - pos(Это позиция, где мы нашли совпадение), 3 - количество нами вводимых символов.
function insertMark(string, pos, len) {
  console.log(string.slice(0, pos));
  return (
    //Вводимая нами строка, забираем количество символов от начала строки до начала совпадения и приплюсовываю начало span, дальше от позиции до количества нами вводимых символов, и от количества нами вводимых символов до самого конца (Без второго параметра).

    string.slice(0, pos) +
    `<span>` +
    string.slice(pos, pos + len) +
    `</span>` +
    string.slice(pos + len)
  );
}
