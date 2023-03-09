import paCodes from './paCodes';
import areaGrps from './areas';

  const uniqueifyArray = (dat, uLst, prop) => {
    let returnArr = [];
    for (let i = 0; i < uLst.length; i +=1) {
      for (let el of dat) {
        let y = 0;
        if (el[prop] == uLst[i]) {
          returnArr.push(el)
          y = 1;
        }
        if (y == 1) {
        break;
        }
      }
    }
    return returnArr;
  }

export default (data) => {
  // the purpose of this is to return processed data
  // with all of the properties needed for the bubble version of the 
  // visualization

  // Custom paCodes
  for (let m of data) {
    if (m.code === 'PaExp') {
      m.code = paCodes[m.display]
    }
  }

  let medicareMeasures = [];
  let medicaidMeasures = [];
  let commercialMeasures = [];

  for (let el of data) {
    if (el.plan == 'medicaid') {
      medicaidMeasures.push(el.code);
    }
    if (el.plan == 'commercial') {
      commercialMeasures.push(el.code);
    }
    if (el.plan == 'medicare') {
      medicareMeasures.push(el.code);
    }
  }

  // add extra properties
  for (let m of data) {
    // create unique id for codes with subcodes
    m.id = `${m.code}${m.subcode != '' ? `-${m.subcode}` : ''}`
    m.opas = 1;
    // identify all elements by segment (needed when the array 
    // is filtered for unique codes)
    (commercialMeasures.includes(m.code) ? m.commercial = 1 : m.commercial = 0);
    (medicareMeasures.includes(m.code) ? m.medicare = 1 : m.medicare = 0);
    (medicaidMeasures.includes(m.code) ? m.medicaid = 1 : m.medicaid = 0);

    for (let key in areaGrps) {
      if (areaGrps[key].includes(m.area)) {
        m.aGrp = key;
      }
    }

    
    
    // add outcome / process / experience feature
    if (m.weight == '1.0') {
      m.cat = 'process';
    } else if (m.weight == '1.5') {
      m.cat = 'experience';
    } else { // weight == '3.0'
      m.cat = 'outcome';
    }
  }  
  // get the list of unique codes/subcode combinations  
  let uniqueMeasureCodes = [...new Set(data.map((item) => item.id))];

  data = uniqueifyArray(data, uniqueMeasureCodes, 'id')

  //console.log(data);
  return data;

}