// 'Johnson With JS' [Version : 23b3]

/**
 * ---
 * ## `GetMealZone`
 * ### 파라미터에 입력 된 값을 기반으로 알맞은 급식 시간대를 반환합니다.
 * ---
 * @param {object} Data 급식 정보가 포함된 `object`
 * @param {Boolean} AutoMeal 자동으로 현재 시간대에 맞는 급식 정보 반환 여부
 * @param {String} MealValue 가져올 급식 식단의 시간대
 * ---
 * @returns 파라미터에 입력 된 값을 기반으로 알맞은 급식 시간대를 반환합니다.
 * ---
*/

function GetMealZone(Data, AutoMeal, MealValue){

  let MealZone = MealValue;

  if (AutoMeal) {
    const hour = new Date().getHours();
    const Valid_breakfast = Data['menu'][0]['breakfast'].length !== 0;
    const Valid_lunch = Data['menu'][0]['lunch'].length !== 0;
    const Valid_dinner = Data['menu'][0]['dinner'].length !== 0;

    if (Valid_breakfast && Valid_lunch && Valid_dinner) {
      MealZone = hour >= 0 && hour < 8 ? 'breakfast' : (hour >= 8 && hour < 14 ? 'lunch' : 'dinner');
    } else if (Valid_breakfast && Valid_lunch && !Valid_dinner) {
      MealZone = hour >= 0 && hour < 8 ? 'breakfast' : 'lunch';
    } else if (Valid_breakfast && Valid_dinner && !Valid_lunch) {
      MealZone = hour >= 0 && hour < 14 ? 'breakfast' : 'dinner';
    } else if (Valid_lunch && Valid_dinner && !Valid_breakfast) {
      MealZone = hour >= 0 && hour < 14 ? 'lunch' : 'dinner';
    } else {
      MealZone = Valid_lunch ? 'lunch' : 'NULL_MEAL';
    }
  }
  return MealZone;
};


/**
 * ---
 * ## `ParsingMeal`
 * ### 급식 정보를 파싱하여 반환합니다.
 * ---
 * @param {object} Data
 * @param {string} MealZone
 * ---
 * @returns 급식 정보를 파싱하여 반환합니다.
 * ---
*/

function ParsingMeal(Data, MealZone){
  return MealZone !== 'NULL_MEAL' ? [MealZone, ...Data['menu'][0][MealZone]] : ['오늘 급식 정보가 존재하지 않습니다.'];
};


/**
 * ---
 * ## `AllergyInfo`
 * ### 급식 정보와 알레르기 정보를 함께 반환합니다.
 * ---
 * @param {object} MealInfo 급식 정보와 알레르기 정보가 포함된 `object`
 * ---
 * @returns 급식 정보와 알레르기 정보를 함께 반환합니다.
 * ---
*/

function AllergyInfo(MealInfo){
  return typeof MealInfo === 'object' ? `${MealInfo['name']}${MealInfo['allergy']}` : MealInfo;
};


/**
 * ---
 * ## `NowDate`
 * ### 오늘 날짜를 `[년, 월, 일]`와 같은 배열로 반환합니다.
 * ---
 * @returns 오늘 날짜를 `[년, 월, 일]`와 같은 배열로 반환합니다.
 * ---
*/

function NowDate(){
  return [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
}


/**
 * ---
 * ## `MealRequest`
 * ### 파라미터에 입력 된 값을 기반으로 API에 요청하고 그 정보를 파싱하여 반환합니다.
 * ---
 * @param {String} SchoolType 급식 정보를 반환할 학교의 유형
 * @param {String} SchoolCode 급식 정보를 반환할 학교의 고유코드
 * @param {Array} Date 반환할 급식 정보의 날짜
 * @param {Boolean} Allergy 알레르기 정보 표시 여부
 * @param {Boolean} AutoMeal 자동으로 현재 시간대에 맞는 급식 정보 반환 여부
 * @param {String} zoneValue 가져올 급식 식단의 시간대
 * ---
 * @returns 파라미터에 입력 된 값을 기반으로 API에 요청하고 그 정보를 파싱하여 반환합니다.
 * ---
*/

async function MealRequest(SchoolType, SchoolCode, Date = NowDate(), Allergy = false, AutoMeal = true, zoneValue = 'auto'){
  const AllergyMark = Allergy ? 'formed' : 'hidden';
  const API = `https://schoolmenukr.ml/api/${SchoolType}/${SchoolCode}?year=${Date[0]}&month=${Date[1]}&date=${Date[2]}&allergy=${AllergyMark}`;
  const response = await fetch(API);
  const Data = await response.json();
  const Result = ParsingMeal(Data, GetMealZone(Data, AutoMeal, zoneValue));

  if (Allergy) {
    let AllergyResult = [];
    for (const AllergyValue of Result) {
      AllergyResult = [...AllergyResult, AllergyInfo(AllergyValue)];
    }
    return AllergyResult;
  } else {
    return Result;
  }
};


/**
 * ---
 * ## `CreateMealText`
 * ### 파라미터에 입력 된 값을 기반으로 API에 요청하고 그 정보를 파싱하여 설정 된 `div`에 포함합니다.
 * - 다음 `CreateMealText` 함수는 반환 할 급식 정보에 대한 추가 파라미터를 지정할 수 없습니다.
 * ---
 * @param {String} divName 급식 정보를 포함할 `div`의 `id`
 * @param {String} SchoolType 급식 정보를 반환할 학교의 유형
 * @param {String} SchoolCode 급식 정보를 반환할 학교의 고유코드
 * ---
 * @returns 파라미터에 입력 된 값을 기반으로 API에 요청하고 그 정보를 파싱하여 설정 된 `div`에 포함합니다.
 * ---
*/

async function CreateMealText(divName, SchoolType, SchoolCode){
  const meal = await MealRequest(SchoolType, SchoolCode);
      const mealElement = document.getElementById(divName);
      mealElement.innerHTML = meal.join("<br>");
}