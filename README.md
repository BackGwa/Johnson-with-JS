
<p align=center><img src="res/jsjs.png" width="500"></p>

## <big><p align=center><b>Johnson<b></p></big>

<p align=center><b>Johnson으로 JavaScript에서 급식 정보를 편하게 가져오기</b></p>
<br>

<br>

---
## **npm 설치**
> `npm i johnson-js`
---
## **사용방법**
<br>

`MealRequest` 함수를 사용하여 급식 식단을 불러올 수 있습니다. 불러온 식단은 `Array`로 반환됩니다.<br>
> `MealRequest` 함수는 `(학교타입, 학교코드, 날짜, 알레르기_정보_표시, 자동_가져오기, 급식_시간대)`의 정보를 매개변수로 받습니다.

<br>

### **매개변수**

|매개변수|타입|설명|값|유형|
|:-------:|:-------:|:-------|:-------|:-------|
|학교타입|String|급식 정보를 반환할 학교의 유형을 지정합니다.|필수|초등 : `elementary`, 중등 : `middle`, 고등 : `high`|
|학교코드|String|급식 정보를 반환할 학교의 고유코드를 지정합니다.|필수|<a href = 'https://schoolmenukr.ml/code/app'>이 곳에서 검색하여 나온 코드를 입력하세요.</a>|
|날짜|Array|반환할 급식 정보의 날짜를 지정합니다.|기본값 -> `[현재 년도, 현재 월, 현재 일]`|년/월/일 : `[년, 월, 일]`|
|알레르기_정보_표시|Boolean|알레르기 정보 표시 여부를 지정합니다.|기본값 -> `false`|활성화 : `true`, 비활성화 : `false`|
|자동_가져오기|Boolean|자동으로 현재 시간대에 맞는 급식 정보 반환 여부를 지정합니다.|기본값 -> `true`|활성화 : `true`, 비활성화 : `false`|
|급식_시간대|String|가져올 급식 식단의 시간대를 지정합니다.|'자동_가져오기'가 `true`라면 필요하지 않습니다.|조식 : `breakfast`, 중식 : `lunch`, 석식 : `dinner`|

<br>

### **예제 페이지**

다음 웹페이지를 위해서 `"script/"`폴더에 `JohnsonLib.js` 라이브러리가 있어야합니다.

```html
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8" />
        <script src="script/JohnsonLib.js"></script>
    </head>

    <body>
        <div id="Meal_Text"></div>
        <script>
            async function Meal(schoolType, schoolCode){
                const meal = await MealRequest(schoolType, schoolCode);
                const mealElement = document.getElementById("Meal_Text");
                mealElement.innerHTML = meal.join("<br>");
            };
            Meal('high', 'N100000164')
        </script>
    </body>

</html>
```

#### **출력**
```html
<div id="Meal_Text">lunch<br>직접구운 수제 누룽지탕<br>친환경콩나물무침(자율)<br>해물우동볶음면(주찬)<br>수제다코야끼<br>배추김치<br>딸바라떼<br>동물모양찐빵</div>
```

<br>

---
## **사용된 API**
<br>

> <a href = 'https://github.com/5d-jh/school-menu-api'>**[학교식단 API]**</a>