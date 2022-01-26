export const formatCurrency = (amt, currency = "INR") => {
  const opts = { style: "currency", currency };
  return amt.toLocaleString("en-IN", opts);
};

export const makeCall = async (url, config) => {
  const req = await fetch(url, config);
  const resp = await req.json();

  return resp;
};

export const getData = async (url) => {
  const resp = await makeCall(url, { method: "GET" });
  return resp;
};
export const deleteData = async (url) => {
  const resp = await makeCall(url, { method: "DELETE" });
  return resp;
};

export const postData = async (url, body) => {
  console.log("body-->", body);
  const resp = await makeCall(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });

  return resp;
};

//userID -- whenever we load the app a new id is created
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => {
    const uuid =
      c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)));

    return uuid.toString(16);
  });
}

export function getCardType(cardNumber) {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    console.log("card..", card, cardNumber);
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      return card;
    }
  }
  return "Unknown";
}
