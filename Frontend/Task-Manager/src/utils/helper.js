const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

const isPasswordValid=(password)=>{
    return /^.{8,}$/.test(password);
}

const isNameValid = (name) => {
    return /^[A-Za-z]+ [A-Za-z]+$/.test(name.trim());
  }

const isAdminTokenValid =(administrativeToken)=>{
    return /^\d{8,}$/.test(administrativeToken.trim(" "));
}

const addThousandsSeparator = (num) =>{
  if(num==null || isNaN(num)) return ""
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?!\d)/g,",")

  return fractionalPart?`${formattedInteger}.${fractionalPart}`:formattedInteger;
}

export{
    isNameValid,
    isEmailValid,
    isPasswordValid,
    isAdminTokenValid,
    addThousandsSeparator
}
  