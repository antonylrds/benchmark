var chart = null;
var dataPoints = [];
let start = 0;
let algoritmos = {
    "selectionSort": selectionSort,
    "bubbleSort": bubbleSort,
    "insertionSort": insertionSort,
    "mergeSort": mergeSort,
    "quickSort": quickSort
};
let ordems = {
    "ordenado": arrayOrdenado,
    "invertido": arrayInvertido,
    "randomico": arrayRandomico
};
var data = arrayRandomico(20);

function callback(data) {
  for (var i = 0; i < data.length; i++) {
    dataPoints.push({
      x: i,
      y: data[i]
    });

    chart.render();
  }
}

chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light1",
  title: {
    text: "Ordenação"
  },
  data: [{
    name: "Lista",
    type: "column",
    color: "darkgreen",
    showInLegend: true,
    yValueFormatString: "#,### Units",
    dataPoints: dataPoints
  }]
});
callback(data);
function novaLista(){
    let tam = $("#tamArray").val();
    let ordem = $("#selectOrdem").val();
    dataPoints = [];
    data = ordems[ordem](tam);
    callback(data);
    chart.options.data[0].dataPoints = dataPoints
    chart.render();
}


function ordenar(){
    var items = chart.options.data[0].dataPoints;
    let algoritmo = $("#selectAlgoritmo").val();
    orderBy(items, algoritmos[algoritmo]);
}

function orderBy(array, algoritmo){
    start = Date.now();
    let result = algoritmo(array, 0, array.length-1);
    if(algoritmo == quickSort) console.log(result);
    if(algoritmo == mergeSort){
      var len = result.length;
      for(var i = 0; i < len; i++){
        result[i].x = i+1;
      }
      chart.options.data[0].dataPoints = result
    } ;
    let tempo = Date.now()-start;    
    let milisegundos = document.createTextNode("Tempo em milisegundos: "+tempo.toString());
    $("h1").text('');
    document.getElementById('milisegundos').appendChild(milisegundos);
    chart.render();
}

function selectionSort(items){

  var len = items.length,
      min;

  for (var i=0; i < len; i++){

      //set minimum to this position
      min = i;

      //check the rest of the array to see if anything is smaller
      for (var j=i+1; j < len; j++){
          if (items[j].y < items[min].y){
              min = j;
          }
      }

      //if the minimum isn't in the position, swap it
      if (i != min){
          swap(items, i, min);
      }
  }

  return items;
}

function bubbleSort(items) {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < items.length-1; i++) {
            if (items[i].y > items[i+1].y) {
                var temp = items[i].y;
                items[i].y = items[i+1].y;
                items[i+1].y = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function insertionSort(items) {
    for (var i = 0; i < items.length; i++) {
        let value = items[i].y
        for (var j = i - 1; j > -1 && items[j].y > value; j--) {
          items[j + 1].y = items[j].y
        }
        items[j + 1].y = value
      }
    
      return items;
  };

  function merge(leftArr, rightArr) {
    var sortedArr = [];
      while (leftArr.length && rightArr.length) {
        if (leftArr[0].y <= rightArr[0].y) {
          sortedArr.push(leftArr[0]);
          leftArr = leftArr.slice(1)
       } else {
          sortedArr.push(rightArr[0]);
          rightArr = rightArr.slice(1)
         }
       }
      while (leftArr.length)
        sortedArr.push(leftArr.shift());
      while (rightArr.length)
        sortedArr.push(rightArr.shift());
      return sortedArr;
    }

    function mergeSort(arr) {
      if (arr.length < 2) {
        return arr; }
      else {
        var midpoint = parseInt(arr.length / 2);
        var leftArr   = arr.slice(0, midpoint);
        var rightArr  = arr.slice(midpoint, arr.length);
        return merge(mergeSort(leftArr), mergeSort(rightArr));
      }
    }

    /* function partition(items, left, right) {
      var pivot   = items[Math.floor((right + left) / 2)], //middle element
          i       = left, //left pointer
          j       = right; //right pointer
      while (i <= j) {
          while (items[i].y < pivot.y) {
              i++;
          }
          while (items[j].y > pivot.y) {
              j--;
          }
          if (i <= j) {
            //console.log(i,j);
              swap(items, i, j); //sawpping two elements
              i++;
              j--;
          }
      }
      return i;
  }
  
  function quickSort(items, left, right) {
      var index;
      if (items.length > 1) {
          index = partition(items, left, right); //index returned from partition
          if (left < index - 1) { //more elements on the left side of the pivot
              quickSort(items, left, index - 1);
          }
          if (index < right) { //more elements on the right side of the pivot
              quickSort(items, index, right);
          }
      }
      return items;
  } */

  function quickSort(origArray) {
    if (origArray.length <= 1) { 
      return origArray;
    } else {
  
      var left = [];
      var right = [];
      var newArray = [];
      // var pivot = origArray.pop();
      var pivot = origArray.
      var length = origArray.length;
  
      for (var i = 0; i < length; i++) {
        if (origArray[i] <= pivot) {
          left.push(origArray[i]);
        } else {
          right.push(origArray[i]);
        }
      }
  
      return newArray.concat(quickSort(left), pivot, quickSort(right));
    }
  }

function comparar(item1, item2) {
  item1.color = "red";
  item2.color = "red";
  chart.render();
}

function removerComparar(item1, item2) {
  item1.color = "blue";
  item2.color = "blue";
  chart.render();
}


function swap(items, firstIndex, secondIndex){
  var temp = items[firstIndex].y;
  items[firstIndex].y = items[secondIndex].y;
  items[secondIndex].y = temp;
  console.log(items[firstIndex].y, items[secondIndex].y);
}

function arrayOrdenado(tam){
    let array = [];
    for(var i = 1; i <= tam; i++){
        array.push(i);
    }
    return array;
}

function arrayInvertido(tam){
    let array = [];
    for(var i = tam; i > 0; i--){
        array.push(i);
    }
    return array;
}

function arrayRandomico(tam){
    let array = [];
    let newValue = 0;
    for(var i = 0; i < tam; i++){
        newValue = Math.floor(Math.random()*tam*100);
        if(array.indexOf(newValue) < 0){
            array.push(newValue);
        }else{
            i--;
        }
    }
    return array;
}
