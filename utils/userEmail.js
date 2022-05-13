const userRegistrationEmail= (name,email,password) => {
 return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <style type="text/css">
      body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-full,.w-full>tbody>tr>td{width:100% !important}.p-lg-10:not(table),.p-lg-10:not(.btn)>tbody>tr>td,.p-lg-10.btn td a{padding:0 !important}.p-4:not(table),.p-4:not(.btn)>tbody>tr>td,.p-4.btn td a{padding:16px !important}.p-6:not(table),.p-6:not(.btn)>tbody>tr>td,.p-6.btn td a{padding:24px !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-4>tbody>tr>td{font-size:16px !important;line-height:16px !important;height:16px !important}.s-6>tbody>tr>td{font-size:24px !important;line-height:24px !important;height:24px !important}.s-10>tbody>tr>td{font-size:40px !important;line-height:40px !important;height:40px !important}}
    </style>
  </head>
  <body class="bg-light" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
    <table class="bg-light body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
      <tbody>
        <tr>
          <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#f7fafc">
            <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                    <!--[if (gte mso 9)|(IE)]>
                      <table align="center" role="presentation">
                        <tbody>
                          <tr>
                            <td width="600">
                    <![endif]-->
                    <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                      <tbody>
                        <tr>
                          <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="ax-center" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                    <img alt="logo" class="w-100" src="${process.env.VUE_APP_LOGOEMAIL}" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; border-style: none; border-width: 0;">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="card p-6 p-lg-10" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 40px;" align="left" bgcolor="#ffffff">
                                    <div class="text-xl" style="font-size: 20px; line-height: 24px;">
                                      Ti diamo il benvenuto nella piattaforma
                                    </div>
                                    <table class="s-4 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;" align="left" width="100%" height="16">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;" align="left">Ciao ${name}</p>
                                    <p class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;" align="left">Qui potrai visualizzare tutti i tuoi corsi bonus e quelli acquistati</p>
                                    <p class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;" align="left">Per procedere al login ecco il tuo username e la tua password che potrai cambiare in seguito nel tuo profilo personale</p>
                                    <ul class="text-lg" style="font-size: 18px; line-height: 21.6px;">
                                      <li>Username: ${email}</li>
                                      <li>Password: ${password}</li>
                                    </ul>
                                    <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="btn btn-primary fw-700  p-4" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; font-weight: 700 !important;">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 16px; border-radius: 6px; font-weight: 700 !important; margin: 0;" align="center" bgcolor="#0d6efd">
                                            <a href="${process.env.URL_PIATTAFORMA}" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: 700 !important; white-space: nowrap; background-color: #0d6efd; padding: 16px; border: 1px solid #0d6efd;">Procedi al login</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="ax-center" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                    <img class="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABiCAMAAABOBz4hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFysjK0c7Q7OzszMrM8fDwcWZumZCW2dbYqaaprqmsnpmcop2hxsTGfHJ6qaGnubG2l42UjIKJsKmuiH6FoJiekYiOpJ2ijoWMgHV9jYSLkomQnpWbeW52lpGVvr2+pp6kmpGYmI6VhXqC1dTVnJSaaF1l6unqZVpi6OjompaZiIGGdGpxj4aNg3mAhYCEgXh+eXJ3lIySk4qRhX2DtK2y5uXmqqKnh32Eopqg0M3Prqas2trarqyuzMjLwsDB4N/gyMfIrKaqi4GIjoqN5eTlbGJpfnV8u7m74uHi0tHSsquwxMLE3t3efXZ729ja1NPUtrC0wLy/wL/A3Nvci4WJvLq84uDixMHD2NfY3dzc3t7eta60m5KZ4N7gpJuhrKSqdnB0pqClx8XHd2101NTUs7Gyz8zOtrW2a2Bo19bX5uTm7Ors2NXXcmhwu7i6x8LGsqywqqipxL/CenF3oqChkY2Q6ujquLa4ZltjaWJngn2Bn5adz87PoJ2fe3Z6npudwr3B1NHTtrK1aWBnurS4pqSlsK6w6Ofnwr7Bf3p+dG5yvri81tPVvru90dDRrKmr2tjZ7eztsq+x5OLkycTHtLGzqKSnpaKktbG0lI6S0tDRubS43dzdtbK0vLi7vre85+bnxsPFure54eDhycbJpqKll5OWb2Vs09LTzszNsK2vzMbLbWNqysXIw77CpKGjvLa6mpiZ19LW4+Ljwb3AlJCTtK6yq6Sp6ejppJ+j397f1dHUp6KmxcDEYldfu7e6urO4y8fKxsHFZVxjin+Hg3d/cmdv/f39+vr6+/v7/Pz8+fn5+Pj49fX19vb29/f39PT08vLy8/Pz7+/v7u7u7+7v8O/w9vX29PP0+/r79fT1+Pf4zcvM+Pf38fHx8/Ly+fj5/fz9p5+l8O/v9PPz8/Lzp6Gm7e3tal9n+/r69fT0t7O2u7W6/Pv8/v399vX1+fj49/b3rqesZFphloyUe294xb/D+vn6/v7+6+rr1tXWZ2Bldmtzv7m9nZqc////fgAvngAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAABH7SURBVHja3Fx5QFNXug9bBDFAFkgCCCQmKBDAhC2yKIsgmzUsVmZAVBgVZqA6QmsqIu5olbLYosWNxQfKqLSDCm6ddgbNQsLqNpaij7ZAa+e9KaN9Dx563r3n3mCCKErwPcL94+bcc5OP+zvnW37fd86FAN7oaMmYMcMPTI+D8Hpfkx58dJnqIhbP5SLHXDE3THD5xKF/THvo0gAhSZxG5YjOZbxzVyqVPizeUVYw4JDFTaOLjk1j6JLzvLmh/JiE1mapTC6R4J0SuUyq6FtHoXKN1hRNT+iNwn6XNXotCplkrLtyqaIxhsfNOvr9tIN+0INLPvV9s+RVv5e1eg1kpvX2TSvoQx5cmwylbHwRzYMbqH/zvj1toBdXc/krlZLX9P/tC0ihu6cJ9J+Ngv/c8QZiZPM+z/TYOg2g9zln7jaUv5kghR+Nu0au69ArXCx/r3hzUe3nhnmLdRt6A9ekc0Kymk8Lbi7UYejN8Tf12iYqrZwi3qiz0GVMxgzZxMV17s6k6Cj0/KywYok28lo+4dJ0Enp+VtYftBTY/Fdxsg5Cl2fZOmotUXFdbKpz0OXWqR9Mgsh/bk87qiPQ9wpKyiAXycnKnxSZivMu/roBfWWvxY3MmadBics7kyT0nm8NQSegywYXzVlg5mp7k1ThOElSG4XuxTpj6/MigsRitu2HlxMmRWwEk6Yz0AEwnMHcdfASK3PLqUkQK1vLKNElD3+F4tMYvsPGaHa59nJbIm39dAg6GGxY3QG8ygST4aCLLIU6xeYczaitAPxWZHTt71qrvL/rKV2CDvJJVsj5p3XD1hJtJesLneW6BB3M4OqhH1FkgdbzvtxnuU5B/4e3O/zc6rpGW9H3fdn/rlOlivqzO+Bnxs0CbWVXkAumPPRrq/O8VB2S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" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; border-style: none; border-width: 0;">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </tbody>
              </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`

}


const userPasswordReset = (userId, token) => {
return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <!-- Compiled with Bootstrap Email version: 1.1.5 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <style type="text/css">
      body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-full,.w-full>tbody>tr>td{width:100% !important}.p-lg-10:not(table),.p-lg-10:not(.btn)>tbody>tr>td,.p-lg-10.btn td a{padding:0 !important}.p-4:not(table),.p-4:not(.btn)>tbody>tr>td,.p-4.btn td a{padding:16px !important}.p-6:not(table),.p-6:not(.btn)>tbody>tr>td,.p-6.btn td a{padding:24px !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-4>tbody>tr>td{font-size:16px !important;line-height:16px !important;height:16px !important}.s-6>tbody>tr>td{font-size:24px !important;line-height:24px !important;height:24px !important}.s-10>tbody>tr>td{font-size:40px !important;line-height:40px !important;height:40px !important}}
    </style>
  </head>
  <body class="bg-light" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
    <table class="bg-light body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
      <tbody>
        <tr>
          <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#f7fafc">
            <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                    <!--[if (gte mso 9)|(IE)]>
                      <table align="center" role="presentation">
                        <tbody>
                          <tr>
                            <td width="600">
                    <![endif]-->
                    <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                      <tbody>
                        <tr>
                          <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="ax-center" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                    <img alt="logo" class="w-100" src="${process.env.VUE_APP_LOGOEMAIL}" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; border-style: none; border-width: 0;">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="card p-6 p-lg-10" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 40px;" align="left" bgcolor="#ffffff">
                                    <div class="text-xl  text-center" style="font-size: 20px; line-height: 24px;" align="center">
                                      Procedi al reset della tua password
                                    </div>
                                    <table class="s-4 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;" align="left" width="100%" height="16">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;" align="left">Abbiamo ricevuto una richiesta per recuperare la tua password. <br>
                                       Se sei tu, clicca sul link qui sotto, altrimenti ignora questa email</p>
                                    <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="btn btn-primary fw-700  p-4" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; font-weight: 700 !important;">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 16px; border-radius: 6px; font-weight: 700 !important; margin: 0;" align="center" bgcolor="#0d6efd">
                                            <a href="${process.env.FRONT_URL}password-reset/${userId}/${token}" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: 700 !important; white-space: nowrap; background-color: #0d6efd; padding: 16px; border: 1px solid #0d6efd;">Recupera Password</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="ax-center" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                    <img class="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABiCAMAAABOBz4hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFysjK0c7Q7OzszMrM8fDwcWZumZCW2dbYqaaprqmsnpmcop2hxsTGfHJ6qaGnubG2l42UjIKJsKmuiH6FoJiekYiOpJ2ijoWMgHV9jYSLkomQnpWbeW52lpGVvr2+pp6kmpGYmI6VhXqC1dTVnJSaaF1l6unqZVpi6OjompaZiIGGdGpxj4aNg3mAhYCEgXh+eXJ3lIySk4qRhX2DtK2y5uXmqqKnh32Eopqg0M3Prqas2trarqyuzMjLwsDB4N/gyMfIrKaqi4GIjoqN5eTlbGJpfnV8u7m74uHi0tHSsquwxMLE3t3efXZ729ja1NPUtrC0wLy/wL/A3Nvci4WJvLq84uDixMHD2NfY3dzc3t7eta60m5KZ4N7gpJuhrKSqdnB0pqClx8XHd2101NTUs7Gyz8zOtrW2a2Bo19bX5uTm7Ors2NXXcmhwu7i6x8LGsqywqqipxL/CenF3oqChkY2Q6ujquLa4ZltjaWJngn2Bn5adz87PoJ2fe3Z6npudwr3B1NHTtrK1aWBnurS4pqSlsK6w6Ofnwr7Bf3p+dG5yvri81tPVvru90dDRrKmr2tjZ7eztsq+x5OLkycTHtLGzqKSnpaKktbG0lI6S0tDRubS43dzdtbK0vLi7vre85+bnxsPFure54eDhycbJpqKll5OWb2Vs09LTzszNsK2vzMbLbWNqysXIw77CpKGjvLa6mpiZ19LW4+Ljwb3AlJCTtK6yq6Sp6ejppJ+j397f1dHUp6KmxcDEYldfu7e6urO4y8fKxsHFZVxjin+Hg3d/cmdv/f39+vr6+/v7/Pz8+fn5+Pj49fX19vb29/f39PT08vLy8/Pz7+/v7u7u7+7v8O/w9vX29PP0+/r79fT1+Pf4zcvM+Pf38fHx8/Ly+fj5/fz9p5+l8O/v9PPz8/Lzp6Gm7e3tal9n+/r69fT0t7O2u7W6/Pv8/v399vX1+fj49/b3rqesZFphloyUe294xb/D+vn6/v7+6+rr1tXWZ2Bldmtzv7m9nZqc////fgAvngAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAABH7SURBVHja3Fx5QFNXug9bBDFAFkgCCCQmKBDAhC2yKIsgmzUsVmZAVBgVZqA6QmsqIu5olbLYosWNxQfKqLSDCm6ddgbNQsLqNpaij7ZAa+e9KaN9Dx563r3n3mCCKErwPcL94+bcc5OP+zvnW37fd86FAN7oaMmYMcMPTI+D8Hpfkx58dJnqIhbP5SLHXDE3THD5xKF/THvo0gAhSZxG5YjOZbxzVyqVPizeUVYw4JDFTaOLjk1j6JLzvLmh/JiE1mapTC6R4J0SuUyq6FtHoXKN1hRNT+iNwn6XNXotCplkrLtyqaIxhsfNOvr9tIN+0INLPvV9s+RVv5e1eg1kpvX2TSvoQx5cmwylbHwRzYMbqH/zvj1toBdXc/krlZLX9P/tC0ihu6cJ9J+Ngv/c8QZiZPM+z/TYOg2g9zln7jaUv5kghR+Nu0au69ArXCx/r3hzUe3nhnmLdRt6A9ekc0Kymk8Lbi7UYejN8Tf12iYqrZwi3qiz0GVMxgzZxMV17s6k6Cj0/KywYok28lo+4dJ0Enp+VtYftBTY/Fdxsg5Cl2fZOmotUXFdbKpz0OXWqR9Mgsh/bk87qiPQ9wpKyiAXycnKnxSZivMu/roBfWWvxY3MmadBics7kyT0nm8NQSegywYXzVlg5mp7k1ThOElSG4XuxTpj6/MigsRitu2HlxMmRWwEk6Yz0AEwnMHcdfASK3PLqUkQK1vLKNElD3+F4tMYvsPGaHa59nJbIm39dAg6GGxY3QG8ygST4aCLLIU6xeYczaitAPxWZHTt71qrvL/rKV2CDvJJVsj5p3XD1hJtJesLneW6BB3M4OqhH1FkgdbzvtxnuU5B/4e3O/zc6rpGW9H3fdn/rlOlivqzO+Bnxs0CbWVXkAumPPRrq/O8VB2S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" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; border-style: none; border-width: 0;">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </tbody>
              </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`
}



module.exports = {userRegistrationEmail, userPasswordReset};
