import { sleep, group } from 'k6'
import http from 'k6/http'
import { performCheck } from './Helpers.js'

import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = { 
  vus: 10, 
  duration: '1m', 
ext: {
  loadimpact: {
    name: 'Generate Data',
  }
 }
}

export default function main() {
  let response

  const vars = {}

  group('page_1 - https://develop.d3nylssqqiptjw.amplifyapp.com/', function () {
    response = http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwl73dQ-LQhwGwk5bkeCYaZcemLts8b20',
      '{"returnSecureToken":true,"email":"martin@test.com","password":"123456"}',
      {
        headers: {
          'content-type': 'application/json',
          'x-client-version': 'Chrome/JsCore/9.8.2/FirebaseCore-web',
          'x-firebase-gmpid': 'web:72eddf6e7effe04f7b46eb',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    performCheck(response, 'Page 1 - Check 1', 200);
    vars['idToken'] = jsonpath.query(response.json(), '$.idToken')[0]

    response = http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDwl73dQ-LQhwGwk5bkeCYaZcemLts8b20',
      `{"idToken":"${vars['idToken']}"}`,
      {
        headers: {
          'content-type': 'application/json',
          'x-client-version': 'Chrome/JsCore/9.8.2/FirebaseCore-web',
          'x-firebase-gmpid': 'web:72eddf6e7effe04f7b46eb',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(1.9)
    performCheck(response, 'Page 1 - Check 2', 200);
  })

  group('page_2 - https://develop.d3nylssqqiptjw.amplifyapp.com/data', function () {
    response = http.get(
      'https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/templates/eAdgyxm8zDfEDlIACUlYy5xrFnI2',
      {
        headers: {
          authorization: 'p3biInOxjKJ4YbmCDt43Le44HEHEQIcEPb6JKGMTES2t3vLeRHtzb5sqE469Gip4',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    performCheck(response, 'Page 2 - Check 1', 200);
    vars['userID'] = jsonpath.query(response.json(), '$[0].userID')[0]

    response = http.options(
      'https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/templates/eAdgyxm8zDfEDlIACUlYy5xrFnI2',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          origin: 'https://develop.d3nylssqqiptjw.amplifyapp.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    sleep(9)
    performCheck(response, 'Page 2 - Check 2', 200);
    response = http.options(
      'https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/fileUrls/eAdgyxm8zDfEDlIACUlYy5xrFnI2',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          origin: 'https://develop.d3nylssqqiptjw.amplifyapp.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )

    response = http.get(
      'https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/fileUrls/eAdgyxm8zDfEDlIACUlYy5xrFnI2',
      {
        headers: {
          authorization: 'p3biInOxjKJ4YbmCDt43Le44HEHEQIcEPb6JKGMTES2t3vLeRHtzb5sqE469Gip4',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(1.4)
    performCheck(response, 'Page 2 - Check 3', 200);
    response = http.post(
      'https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/fileUrls/eAdgyxm8zDfEDlIACUlYy5xrFnI2',
      `{"url":"https://firebasestorage.googleapis.com/v0/b/tdg-generic-dc6ee.appspot.com/o/files%2FeAdgyxm8zDfEDlIACUlYy5xrFnI2%2FPersonal-xvCwqL.zip?alt=media&token=f43f40fd-7504-4d75-a3d5-d2949e9462f3","fileName":"Personal-xvCwqL.zip","userID":"${vars['userID']}"}`,
      {
        headers: {
          authorization: 'p3biInOxjKJ4YbmCDt43Le44HEHEQIcEPb6JKGMTES2t3vLeRHtzb5sqE469Gip4',
          'content-type': 'application/json',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(1.8)
  })

  group('page_3 - https://develop.d3nylssqqiptjw.amplifyapp.com/history', function () {
    response = http.get(
      'https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/fileUrls/eAdgyxm8zDfEDlIACUlYy5xrFnI2',
      {
        headers: {
          authorization: 'p3biInOxjKJ4YbmCDt43Le44HEHEQIcEPb6JKGMTES2t3vLeRHtzb5sqE469Gip4',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(3.3)
    performCheck(response, 'Page 3 - Check 1', 200);
  })

  group('page_4 - https://develop.d3nylssqqiptjw.amplifyapp.com/', function () {
    response = http.get('https://develop.d3nylssqqiptjw.amplifyapp.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    performCheck(response, 'Page 3 - Check 1', 200);
  })
}