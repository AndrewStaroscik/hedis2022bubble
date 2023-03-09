
export default (data) => {
  // functions to get the data in the structure wanted for a tree or circle pack 

  // set the custom PaExp codes
  let paCodes = {
    'Getting care easily':'GCE', 
    'Getting care quickly':'GCQ',
    'Rating of primary care doctor':'RPC',
    'rating of specialist': 'RSP',
    'coordination of care': 'COC',
    'Rating of health plan': 'RHP',
    'Rating of care': 'ROC'
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


  // loop through and make the final child nodes with all of the extra data needed:
  let finalCodeList = [];
  let baseCodeList = [];
  for (let el of data) {
    // add unique patient experience and subcode values
    let scodeStr = '';
    let codeStr = el.code;
    if (el.code == 'PaExp') {
      scodeStr = paCodes[el.display];
      codeStr = paCodes[el.display] ;
    } else if (el.subcode == "") {
      scodeStr = el.code;
    } else {
      scodeStr = el.code + '-' + el.subcode;
      el.children = []; // all original codes will 'subcode' will have children
    }
    // set new measure type category for each measure based on weight
    if (el.weight == '1.0') {
      el.meas = 'process';
    } else if (el.weight == '1.5') {
      el.meas = 'experience';
    } else {
      el.meas = 'outcome';
    }

    // save all of the codes and subcodes to remove duplicates later
    baseCodeList.push(codeStr);
    finalCodeList.push(scodeStr);

    // add the information to measures including new tags for segments
    el.finalCode = scodeStr;
    el.name = scodeStr;
    (commercialMeasures.includes(el.code) ? el.commercial = 1 : el.commercial = 0);
    (medicareMeasures.includes(el.code) ? el.medicare = 1 : el.medicare = 0);
    (medicaidMeasures.includes(el.code) ? el.medicaid = 1 : el.medicaid = 0);
  }
  
  // make the code and subcode lists unique sets
  finalCodeList = [... new Set(finalCodeList)] ;
  baseCodeList = [... new Set(baseCodeList)];

// use unique set of codes from above to get rid of duplicate measures
let fullData = [];
for (let i = 0; i < finalCodeList.length; i +=1) {
  for (let el of data) {
    let y = 0;
    if (el.finalCode == finalCodeList[i]) {
      fullData.push(el);
      y = 1;
    }
    if (y == 1) {
      break;
    }
  }
}

// now fulData has the 67 unique final codes that will appear as the terminal nodes
// if there is no subcode this is the leaf. If there is, the subcodes are the
// terminal nodes

// get the code for all of the measures that have subcodes:
let codeWithSubCodes = [...new Set(fullData.map((item) => {
  if (item.subcode != '') return item.code;
}))];

let dataLvl2 = [];
// // add subcode items as children
for (let el of fullData) {
  if (codeWithSubCodes.includes(el.code)) {
    // add area and type here so they can be used for nesting later
    dataLvl2.push({name: el.code, area: el.area, type:el.type, children: []});
  } else {
    dataLvl2.push(el);
  }
}

// adding children re-introduced redundancy
// loop through to get rid of duplicates using basecodeList from above
let dataLvl2b = [];
for (let i = 0; i < baseCodeList.length; i +=1) {
  for (let el of dataLvl2) {
    let y = 0;
    if (el.name == baseCodeList[i]) {
      dataLvl2b.push(el);
      y = 1;
    }
    if (y == 1) {
      break;
    }
  }
}

// Get just the elements that have subcodes
let subCodeElementsAll = []
for (let el of fullData) {
  if (el.subcode != "") {
    subCodeElementsAll.push(el);
  }
}


// loop through to put the elements with subcodes into the children array of the parent code
for (let el of dataLvl2b) {
  if (el.hasOwnProperty('children')) {
    for (let subel of subCodeElementsAll) {
      if (subel.code == el.name) {
        el.children.push(subel);
      }
    }
  }
}

// first layer of nesting done all codes with subcodes captured in a parent child structure
// 58 total measures with some having child nodes

// Get areas for next level of nesting
let uniqueAreas = [...new Set(fullData.map((item) => item.area))];

// nest data into area layer
let areaArray = [];
for (let a of uniqueAreas) {
  let tmpObj = {name: a, children: []};
  for (let el of dataLvl2b) {
    if (el.area == a) {
      tmpObj.children.push(el);
      tmpObj.type = el.type; // this will update for every child but all children should have the same value. 
    }
  }
  areaArray.push(tmpObj);
}

// Get types for final layer of nesting
 let uniqueTypes = [...new Set(fullData.map((item) => item.type))];

let typeArray = [];
 for (let t of uniqueTypes) {
  let tmpObj = {name: t, children: []};
  for (let el of areaArray) {
     if (el.type == t) {
       tmpObj.children.push(el);
     }
   }
   typeArray.push(tmpObj);
 }

 // return nested data structure
 return typeArray;

}