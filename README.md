
<p align=center><img src="res/jsjs.png" width="500"></p>

## <big><p align=center><b>Johnson<b></p></big>

<p align=center><b>Johnson으로 JavaScript에서 급식 정보를 편하게 가져오기</b></p>
<br>
<i><p align=center>현재 Johnson With JS는 안정화되지 않았습니다!!</p></i>

<br>

---
## **사용방법**
<br>

`Meal_Get` 함수를 사용하여 급식 식단을 불러올 수 있습니다. 불러온 식단은 `Array`로 반환됩니다.<br>
> `Meal_Get` 함수는 `(학교타입, 학교코드, 날짜, 알레르기_정보_표시, 자동_가져오기, 급식_시간대)`의 정보를 매개변수로 받습니다.

<br>

### **매개변수**

|매개변수|타입|설명|선택사항|값|
|:-------:|:-------:|:-------|:-------|:-------|
|학교타입|String|학교의 타입을 지정합니다.|필요|초등 : `elementary`, 중등 : `middle`, 고등 : `high`|
|학교코드|String|학교의 고유코드를 지정합니다.|필요|<a href = 'https://schoolmenukr.ml/code/app'>이 곳에서 검색하여 나온 코드를 입력하세요.</a>|
|날짜|Array|[년, 월, 일]의 급식 정보를 반환합니다.|기본값 -> `[현재 년도, 현재 월, 현재 일]`|표시 : `true`, 숨기기 : `false`|
|알레르기_정보_표시|Boolean|알레르기 정보 표시 여부를 지정합니다.|기본값 -> `false`|활성화 : `true`, 비활성화 : `false`|
|자동_가져오기|Boolean|현재 시간대에 맞는 급식 정보 반환여부를 지정합니다.|기본값 -> `true`|년/월/일 : `[년, 월, 일]`|
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
        <input type="text" id="school-type" name="school-type" placeholder="학교 타입"/>
        <input type="text" id="school-code" name="school-code" placeholder="학교 코드"/>

        <button id="get-meal" type="submit">급식 정보 가져오기</button>

        <div id="meal" class="meal"></div>
            
        <script>
            const getMeal = async () => {
                const schoolType = document.getElementById("school-type").value;
                const schoolCode = document.getElementById("school-code").value;

                const meal = await Meal_Get(schoolType, schoolCode);
                const mealElement = document.getElementById("meal");
                mealElement.innerHTML = meal.join("<br>");
            };
            document.getElementById("get-meal").addEventListener("click", getMeal);
        </script>
    </body>

</html>
```

#### **출력**
```html
<div id="meal" class="meal">dinner<br>친환경찹쌀밥<br>부산식돼지국밥<br>청양계란장조림<br>친환경부추겉절이<br>배추김치<br>불고기사각피자</div>
```

<br>

---
## **사용된 API**
<br>

> <a href = 'https://github.com/5d-jh/school-menu-api'>**[학교식단 API]**</a>