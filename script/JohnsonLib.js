const mealZone = (data, usetime, mealValue) => {
  let mealzone = mealValue;
  let result = '';

  if (usetime) {
    const hour = new Date().getHours();
    const isbf = data['menu'][0]['breakfast'].length !== 0;
    const islc = data['menu'][0]['lunch'].length !== 0;
    const isdr = data['menu'][0]['dinner'].length !== 0;

    if (isbf && islc && isdr) {
      mealzone = hour >= 0 && hour < 8 ? 'breakfast' : (hour >= 8 && hour < 14 ? 'lunch' : 'dinner');
    } else if (isbf && islc) {
      mealzone = hour >= 0 && hour < 8 ? 'breakfast' : 'lunch';
    } else if (islc && isdr) {
      mealzone = hour >= 0 && hour < 14 ? 'lunch' : 'dinner';
    } else {
      mealzone = islc ? 'lunch' : 'None';
    }
  }

  result = mealzone !== 'None' ? [mealzone, ...data['menu'][0][mealzone]] : ['급식 정보가 존재하지 않습니다.'];
  return result;
};

const alegInfo = (mealInfo) => {
  return typeof mealInfo === 'object' ? `${mealInfo['name']}${mealInfo['allergy']}` : mealInfo;
};

const Meal_Get = async (schoolType, schoolCode, date = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()], aleg = false, usetime = true, zoneValue = 'auto') => {
  const allergy = aleg ? 'formed' : 'hidden';
  const API = `https://schoolmenukr.ml/api/${schoolType}/${schoolCode}?year=${date[0]}&month=${date[1]}&date=${date[2]}&allergy=${allergy}`;
  const response = await fetch(API);
  const data = await response.json();
  const result = mealZone(data, usetime, zoneValue);

  let alegResult = [];

  if (aleg) {
    for (const alegValue of result) {
      alegResult = [...alegResult, alegInfo(alegValue)];
    }
    return alegResult;
  } else {
    return result;
  }
};