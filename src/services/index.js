const JSON_BUCKET = 'https://pile-of-crowns.s3.us-east-2.amazonaws.com/'

const getDistrictData = async (state, district) => {
    let response = await fetch(JSON_BUCKET.concat(`${state}-${district}.json`));
    let json = await response.json();
    return json;
}

const getStateData = async state => {
    let response = await fetch(JSON_BUCKET.concat(`${state}.json`));
    let json = await response.json();
    return json;
}


const checkAddressInput = async input => {
    console.time('address')
    let result = {ok: false};

    let response = await fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${input}&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=${process.env.REACT_APP_GOOGLE_CIVIC}`)

    if (response.ok) {
        let json = await response.json();
        let divisions = Object.keys(json.divisions).map(d=>d.slice(d.lastIndexOf('/') + 1));

        divisions.forEach(i=>{
            let [type, value] = i.split(':');
            result[type] = value.toUpperCase();
        })

        if (result.state && result.cd) {
            result.ok = true;
        } else if (['DE', 'VT', 'WY', 'MT', 'ND', 'AK', 'SD'].includes(result.state)) {
            result.cd = '0';
            result.ok = true;
        }
    } else {
        console.error('Malformed Address. Please try again.');
    }
    if (result.state && result.cd) {
        let promises = [];
        promises.push(getDistrictData(result.state, result.cd));
        if (!['CA', 'CT', 'FL', 'HI', 'IN', 'MD', 'MO', 'NV', 'NY', 'ND', 'OH', 'PA', 'UT', 'VT', 'WA', 'WI'].includes(result.state)) {
            promises.push(getStateData(result.state));
        }
        await Promise.all(promises)
            .then(values=> {
                result.reps = values[0].reps;
                values[1] && (result.senators = values[1].senators);
            });
    }
    console.timeEnd('address');
    console.log(result);
    return result;
}

export default {
    getDistrictData:    getDistrictData,
    checkAddress:       checkAddressInput
}