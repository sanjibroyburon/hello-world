

/*
This object represent Invest Assure Silver
*/

var InvestAssureSilver = {
	MinEntryAge : 0,
	MaxEntryAge : 50,
	MinMaturityAge : 18,
	MaxMaturityAge : 70,
	MinPolicyTerm : 17,
	MaxPolicyTerm : 40,
	MinSA :  100000,
	MaxSA : "NOLIMIT",
	MinPremium : {Yearly:5000 , HalfYearly:3000 , Quarterly:2000, Monthly:800 },
	MaxPremium: "NOLIMIT" ,
	HSARThresold : 100000 ,
	HSARRate :10,
	HSARDelta : 1000,
	getPremiumTerm : function( pt ){
			// pt == policy term

			if( pt == 17 )
			{
				return [ 7 ];
			}
			else if( pt > 17 && pt <= 19 )
			{
				return [ 7, pt-10 ];
			}
			else if( pt == 20 )
			{
				return [ 7, 10 ];
			}
			else if( pt > 20 && pt <= 24 )
			{
				return [ 7, 10, pt-10 ];
			}
			else if( pt == 25 )
			{
				return [ 7, 10, 15 ];
			}
			else
			{
				return [ 7, 10, 15, pt-10 ];
			}
	},
	getMaleRate : function(ppt, age, pt){
		var rowAge = (age <= 18) ? 0 : age-18 ;
		var colPT = pt - 17 ;
		switch(ppt){
		case "7" :
			return InvestAssureSilver7[rowAge][colPT];
		case "10" :
			return InvestAssureSilver10[rowAge][colPT];
		case "15" :
			return InvestAssureSilver15[rowAge][colPT];
		default :
			return InvestAssureSilverX[rowAge][colPT];
		} // END SWITCH

	},
	getFemaleRate: function(ppt, age, pt){
		age = (age > 18) ? age-3 : age ;
		return this.getMaleRate(ppt, age, pt);
	}
}; // end of Object InvestAssureSilver





/*
This object represent Invest Assure Gold
*/

var InvestAssureGold = {
	MinEntryAge : 18,
	MaxEntryAge : 50,
	MinMaturityAge : 18,
	MaxMaturityAge : 65,
	MinPolicyTerm : 15,
	MaxPolicyTerm : 40 ,
	MinSA :  100000,
	MaxSA : "NOLIMIT",
	MinPremium : {Yearly:5000 , HalfYearly: 3000, Quarterly: 2000, Monthly:800 },
	MaxPremium:"NOLIMIT" , 
	HSARThresold : 100000,
	HSARRate : 10 ,	
	HSARDelta : 1000,
	getPremiumTerm : function( pt ){
			// pt == policy term
			if( pt == 15 || pt == 17 )
			{
				return [ 5, 7 ];
			}
			else if( pt == 16 )
			{
				return [ 5, 6, 7 ];
			}
			else if( pt >= 18 && pt <= 19 )
			{
				return [ 5, 7, pt-10 ];
			}
			else if( pt == 20 )
			{
				return [ 5, 7, 10 ];
			}
			else if( pt >= 21 && pt <= 24 )
			{
				return [ 5, 7, 10, pt-10 ];
			}
			else if( pt == 25 )
			{
				return [ 5, 7, 10, 15 ];
			}
			else
			{
				return [ 5, 7, 10, 15, pt-10 ];
			}
	} ,
	getMaleRate : function(ppt, age, pt){
		var rowAge = age-18 ;
		var colPT = pt - 15 ;
		switch(ppt){
		case "5":
			return InvestAssureGold5[rowAge][colPT];
		case "7":
			return InvestAssureGold7[rowAge][colPT];
		case "10":
			return InvestAssureGold10[rowAge][colPT];
		case "15":
			return InvestAssureGold15[rowAge][colPT];
		default :
			return InvestAssureGoldX[rowAge][colPT];
		} // END SWITCH

	},
	getFemaleRate : function(ppt, age, pt){
		age = ( age <= 21) ? 18 : age-3 ;
		return this.getMaleRate(ppt, age, pt);
	}
}; 





/*
This object represent Life Long Assure
*/

var LifeLongAssure = {
	MinEntryAge : 10,
	MaxEntryAge : 55,
	MaturityAge : 100,
	getPolicyTerm : function( entryAge ){ return 100-entryAge ;},
	PremiumTerm :  [ 10, 15, 20 ],
	MinSA :  100000,
	MaxSA : "NOLIMIT",
	MinPremiumPPT10 : {Yearly:18303 , HalfYearly:10000 , Quarterly:5500, Monthly:2000 },
	MinPremiumPPT15 : {Yearly:13401 , HalfYearly:8500 , Quarterly:4625, Monthly:1667 },
	MinPremiumPPT20 : {Yearly:10811 , HalfYearly:7000 , Quarterly:3875, Monthly:1471 },
	MaxPremium: "NOLIMIT",
	HSARThresold : 100000,
	HSARDelta : 1000,
	getMinPremium : function( ppt, freq ){
				// ppt == premium term, freq == frequency ( value may be 1, 2, 4, 12)
				switch(ppt)
				{
				case 10:
					switch( freq )
					{
					case 1:
						return MinPremiumPPT10.Yearly ;
					case 2:
						return MinPremiumPPT10.HalfYearly ;
					case 4:
						return MinPremiumPPT10.Quarterly ;
					case 12:
						return MinPremiumPPT10.Monthly ;
					}

				case 15:
					switch( freq )
					{
					case 1:
						return MinPremiumPPT15.Yearly ;
					case 2:
						return MinPremiumPPT15.HalfYearly ;
					case 4:
						return MinPremiumPPT15.Quarterly ;
					case 12:
						return MinPremiumPPT15.Monthly ;
					}
				case 20:
					switch( freq )
					{
					case 1:
						return MinPremiumPPT20.Yearly ;
					case 2:
						return MinPremiumPPT20.HalfYearly ;
					case 4:
						return MinPremiumPPT20.Quarterly ;
					case 12:
						return MinPremiumPPT20.Monthly ;
					}
				}


			} ,
	getHSARRate : function( age, pt ){
			// age == entry age, pt == premium term
			if( age <= 10 && age <= 25 )
			{
				if( pt == 10 ) return 19 ;
				if( pt == 15 ) return 15 ;
				if( pt == 20 ) return 14 ;	
			}
			else if( age <= 26 && age <= 40 )
			{
				if( pt == 10 ) return 14 ;
				if( pt == 15 ) return 12 ;
				if( pt == 20 ) return 10 ;
			}
			else
			{
				if( pt == 10 ) return 11 ;
				if( pt == 15 ) return 9 ;
				if( pt == 20 ) return 8 ;
			}
 
	},
	getMaleRate: function( age, ppt){
		var col ;
		if( ppt == 10 ) col = 0;
		else if( ppt == 15 ) col = 1;
		else col = 2;
		return LifeLongAssureMale[age-10][col] ; 
	},

	getFemaleRate: function( age, ppt ){
		var rowIndex = ( age <= 13 ) ? 0: age-13 ;
		var colIndex ;
		if( ppt == 10 ) colIndex = 0;
		else if( ppt == 15 ) colIndex = 1;
		else colIndex = 2;
		return LifeLongAssureMale[rowIndex][colIndex] ;
	}
}; // end of LIfelong assure





/*
This object represent ISecure
*/

var ISecure = {
	MinEntryAge : 18,
	MaxEntryAge : 60,
	MinMaturityAge : 28,
	MaxMaturityAge : 70,
	PolicyTerm : [10, 15, 20, 25, 30],
	PremiumTerm : 0 , 
	MinSA :  250000,
	MaxSA : 1000000000,
	SADelta : 50000,
	SADelta20 : 100000,
	MinPremium : {Yearly:1000 , HalfYearly:500 , Quarterly:250, Monthly:100 },
	MinPremium20 : {Yearly:3000 , HalfYearly:1500 , Quarterly:750, Monthly:250 },
	MaxPremium: "NOLIMIT", 
	HSARThresold : 500000,
	HSARDelta : 1000,
	getMinPremium : function( sa ){
		// sa == sum assured
		var prm ;
		if( sa < 2000000 )
			return prm = [1000, 500, 250, 100] ;
		else
			return prm = [3000, 1500, 750, 250] ;
	},
	getHSARRate : function( sa, age, smoker ){
		// sa == sum assured, age == entry age, smoker == smoker or non-smoker ( value may be true/false)
		// true == smoker, false == non smoker
		if( sa < 2000000 )
		{
			if( sa < 500000 )
				return 0 ;
			if( sa >= 500000 && sa < 1000000 )
			{
				if( age <= 30 ) return 12.5 ;
				if( age <= 40 ) return 8 ;
				if( age <= 50 ) return 3 ;
				return 0 ; // for age >= 51
			}
			if( sa >= 1000000 && sa < 1500000 )
			{
				if( age <= 30 ) return 20 ;
				if( age <= 40 ) return 10 ;
				if( age <= 50 ) return 5 ;
				return 0 ; // for age >= 51
			}
			// for sa >= 15 lac to < 20 lac
			if( age <= 30 ) return 22.50 ;
			if( age <= 40 ) return 12.50 ;
			if( age <= 50 ) return 5 ;
			return 0 ; // for age >= 51
		}
		else if( smoker == true )
		{
			if( sa >= 2000000 && sa < 2500000 ) return  [ 0, 0.5 ];
			if( sa >= 2500000 && sa < 3000000 ) return  [ 2.5, 0.5 ];
			if( sa >= 3000000 && sa < 3500000 ) return  [ 5, 0.5 ];
			if( sa >= 3500000 && sa < 4000000 ) return  [ 7.5, 0 ];
			if( sa >= 4000000 && sa < 4500000 ) return  [ 7.5, 0.5 ];
			if( sa >= 4500000 && sa < 7500000 ) return  [ 10, 0.08 ];
			return  [ 12.50, 0 ];


		}
		else // smoker == false 
		{
			if( sa >= 2000000 && sa < 2500000 ) return  [ 0, 1.5 ];
			if( sa >= 2500000 && sa < 3000000 ) return  [ 7.5, 1.5 ];
			if( sa >= 3000000 && sa < 3500000 ) return  [ 15, 0.5 ];
			if( sa >= 3500000 && sa < 4000000 ) return  [ 17.5, 1 ];
			if( sa >= 4000000 && sa < 4500000 ) return  [ 22.5, 0.5 ];
			if( sa >= 4500000 && sa < 7500000 ) return  [ 25, 0.25 ];
			if( sa >= 7500000 && sa < 10000000 ) return  [ 32.5, 0.1 ];
			return  [ 35, 0 ];


		}
	},
	getMaleRate: function( age, pt){
		var colIndex ;
		switch( pt )
		{
		case "10":
			colIndex = 0 ;
			break ;
		case "15":
			colIndex = 1 ;
			break ;
		case "20":
			colIndex = 2 ;
			break ;
		case "25":
			colIndex = 3 ;
			break ;
		case "30":
			colIndex = 4 ;
			break ;
		}

		return ISecureRate[age-18][colIndex] ; 
	},

	getFemaleRate: function( age, pt ){
		if( age <= 21 ){ 
			return this.getMaleRate( 18, pt );
		}
		return this.getMaleRate( age-3, pt );
	},
	
	getMaleRateSmoker: function( age, pt){
		var colIndex ;
		switch( pt )
		{
		case "10":
			colIndex = 0 ;
			break ;
		case "15":
			colIndex = 1 ;
			break ;
		case "20":
			colIndex = 2 ;
			break ;
		case "25":
			colIndex = 3 ;
			break ;
		case "30":
			colIndex = 4 ;
			break ;
		}

		return ISecureSmokerRate[age-18][colIndex] ; 
	},

	getFemaleRateSmoker: function( age, pt ){
		if( age <= 21 ) 
			return this.getMaleRateSmoker( 18, pt );
		return this.getMaleRateSmoker( age-3, pt );
	},
	
	getMaleRateNonSmoker: function( age, pt){
		var colIndex ;
		switch( pt )
		{
		case "10":
			colIndex = 0 ;
			break ;
		case "15":
			colIndex = 1 ;
			break ;
		case "20":
			colIndex = 2 ;
			break ;
		case "25":
			colIndex = 3 ;
			break ;
		case "30":
			colIndex = 4 ;
			break ;
		}

		return ISecureNonSmokerRate[age-18][colIndex] ; 
	},

	getFemaleRateNonSmoker: function( age, pt ){
		if( age <= 21 ){ 
			return this.getMaleRateNonSmoker( 18, pt );
		}
		return this.getMaleRateNonSmoker( age-3, pt );
	}


}; 


///// checked
var GuaranteeAssure = {
	MinEntryAge : 9,
	MaxEntryAge : 60,
	MinMaturityAge : 18,
	MaxMaturityAge : 69,
	PolicyTerm : [ 7, 8, 9 ],
	PremiumTerm : 5 ,
	MinSA : 100000 ,
	MaxSA : "NOLIMIT",
	MinPremium : {Yearly: 23839, HalfYearly: 12158, Quarterly:6198, Monthly: 2145},
	MaxPremium: "NOLIMIT",
	HSARThresold : 100000,
	HSARDelta : 1000,
	HSARRate : 7.5,
	getMaleRate: function( age, pt ){
			return GuaranteeAssureMaleRate[age-9][pt-7] ; 
	},
	getFemaleRate: function( age, pt ){
		if( age <= 12 )
			return GuaranteeAssureMaleRate[0][pt-7] ;
		return GuaranteeAssureMaleRate[age-12][pt-7] ; 
	}
}; 


var FreqFactor = {
	Yearly : 1,
	HalfYearly : 0.51,
	Quarterly : 0.26,
	Monthly : 0.09
};





/*
if("createEvent" in document)
{
var evt = document.createEvent("HTMLEvents");
evt.initEvent("change",false,true);
element.dispatchEvent(evt);
}
else
element.fireEvent("onchange");
*/

window.onload = function(){
	document.getElementById("plan").selectedIndex = 0;
}



/*
 * This function populate the Package names when user select Plan
 */
function populatePackage(){
	var pkgOption ;
	
	var selectedPlan = document.getElementById("plan").value ; // get the plan selected
	//remove all existing OPTION element
	var pkgSelectEle = document.getElementById("package") ;
	var len = pkgSelectEle.length ;
	for( var i=0; i< len; i++)
	{
		pkgSelectEle.remove(0);
	}
	switch( selectedPlan )
	{
	case "InvestAssure":
		pkgOption = document.createElement("OPTION");
		pkgOption.value = "Silver";
		pkgOption.text = "Silver";
		pkgSelectEle.add(pkgOption);
		pkgOption = document.createElement("OPTION");
		pkgOption.value = "Gold";
		pkgOption.text = "Gold";
		pkgSelectEle.add(pkgOption);
		pkgSelectEle.selectedIndex = 0 ;
		pkgSelectEle.disabled = false ;
		break ;
	case "LifeLongAssure":
		pkgOption = document.createElement("OPTION");
		pkgOption.value = "Nothing";
		pkgOption.text = "No Package Available";
		pkgSelectEle.add(pkgOption);
		pkgSelectEle.disabled = true ;
		break ;
	case "GuaranteeAssure":
		pkgOption = document.createElement("OPTION");
		pkgOption.value = "Nothing";
		pkgOption.text = "No Package Available";
		pkgSelectEle.add(pkgOption);
		pkgSelectEle.disabled = true ;
		break ;
	case "ISecure":
		pkgOption = document.createElement("OPTION");
		pkgOption.value = "Nothing";
		pkgOption.text = "No Package Available";
		pkgSelectEle.add(pkgOption);
		pkgSelectEle.disabled = true ;
		break ;
	}// end switch
	populateEntryAge();
} // end func




//////////// function to populate entry age

function populateEntryAge(){
	var plan = document.getElementById("plan").value ;
	var package = document.getElementById("package").value ;
	var ageSelect = document.getElementById("age") ;
	var opt ;
	// remove all existing options
	var len = ageSelect.length ;
	for( var i=0; i< len; i++)
	{
		ageSelect.remove(0);
	}
	
	switch( plan )
	{
	case "InvestAssure":
		if(package == "Silver")
		{
			for( var i=InvestAssureSilver.MinEntryAge; i<= InvestAssureSilver.MaxEntryAge; i++)
			{
				opt = document.createElement("OPTION");
				opt.value = i;
				opt.text = i;
				ageSelect.add(opt);
			}
		}
		if(package == "Gold")
		{
			for( var i=InvestAssureGold.MinEntryAge; i<= InvestAssureGold.MaxEntryAge; i++)
			{
				opt = document.createElement("OPTION");
				opt.value = i;
				opt.text = i;
				ageSelect.add(opt);
			}
		}
		break ;

	case "LifeLongAssure":
		for( var i=LifeLongAssure.MinEntryAge; i<= LifeLongAssure.MaxEntryAge; i++)
		{
			opt = document.createElement("OPTION");
			opt.value = i;
			opt.text = i;
			ageSelect.add(opt);
		}
		break ;

	case "GuaranteeAssure":
		for( var i=GuaranteeAssure.MinEntryAge; i<= GuaranteeAssure.MaxEntryAge; i++)
		{
			opt = document.createElement("OPTION");
			opt.value = i;
			opt.text = i;
			ageSelect.add(opt);
		}
		break ;
	case "ISecure":
		for( var i=ISecure.MinEntryAge; i<= ISecure.MaxEntryAge; i++)
		{
			opt = document.createElement("OPTION");
			opt.value = i;
			opt.text = i;
			ageSelect.add(opt);
		}
		break ;

	} // end switch
	ageSelect.selectedIndex = 0;
	populatePolicyTerm();
} // end func onChangePkg


///////////////////////////////
//policy term



// function to populate policy term

function populatePolicyTerm(){
	var plan = document.getElementById("plan").value ;
	var package = document.getElementById("package").value ;
	var entryAge = document.getElementById("age").value ;
	var policyTerm = document.getElementById("policyTerm") ;
	var opt, max, min ;
	var len = policyTerm.length ;
	// remove existing options
	for( var i=0; i< len; i++)
	{
		policyTerm.remove(0);
	}
	switch( plan )
	{
	case "InvestAssure":
		if(package == "Silver")
		{
			max = (parseInt(entryAge) + parseInt(InvestAssureSilver.MaxPolicyTerm) <= InvestAssureSilver.MaxMaturityAge) ? InvestAssureSilver.MaxPolicyTerm : InvestAssureSilver.MaxMaturityAge - entryAge ;
			min = (parseInt(entryAge) == 0) ? 18 : InvestAssureSilver.MinPolicyTerm ;
			for( var i=min ; i <= max ; i++)
			{
				opt = document.createElement("OPTION");
				opt.value = i;
				opt.text = i;
				policyTerm.add(opt);
			}
		}
		if(package == "Gold")
		{
			max = (parseInt(entryAge) + parseInt(InvestAssureGold.MaxPolicyTerm) <= InvestAssureGold.MaxMaturityAge) ? InvestAssureGold.MaxPolicyTerm : InvestAssureGold.MaxMaturityAge - entryAge ;
			for( var i=InvestAssureGold.MinPolicyTerm; i<= max ; i++)
			{
				opt = document.createElement("OPTION");
				opt.value = i;
				opt.text = i;
				policyTerm.add(opt);
			}
		}
		break ;

	case "LifeLongAssure":
		opt = document.createElement("OPTION");
		opt.value = LifeLongAssure.getPolicyTerm(entryAge) ;
		opt.text = LifeLongAssure.getPolicyTerm(entryAge)  ;
		policyTerm.add(opt);
		break ;

	case "GuaranteeAssure":
		for(var i=0; i<3; i++){
			opt = document.createElement("OPTION");
			opt.value = GuaranteeAssure.PolicyTerm[i] ;
			opt.text = GuaranteeAssure.PolicyTerm[i] ;
			policyTerm.add(opt);
		}
		break ;

	case "ISecure":
		for(var i=0; i<5; i++){
			if(parseInt(entryAge) + parseInt(ISecure.PolicyTerm[i]) > ISecure.MaxMaturityAge )
				break;
			opt = document.createElement("OPTION");
			opt.value = ISecure.PolicyTerm[i] ;
			opt.text = ISecure.PolicyTerm[i] ;
			policyTerm.add(opt);
		}
		break ;

	} // end switch	
	populatePremiumTerm();
}







function populatePremiumTerm(){
	var plan = document.getElementById("plan").value ;
	var package = document.getElementById("package").value ;
	var entryAge = document.getElementById("age").value ;
	var pt = document.getElementById("policyTerm").value ;
	var ppt = document.getElementById("premiumTerm") ;
	var opt, len ;
	
	// remove existing options
	len = ppt.length ;
	for( var i=0; i< len; i++)
	{
		premiumTerm.remove(0);
	}
	switch( plan )
	{
	case "InvestAssure":
		if(package == "Silver")
		{
			var temp = InvestAssureSilver.getPremiumTerm(pt);
			for(var i=0; i<temp.length; i++){
				opt = document.createElement("OPTION");
				opt.value = temp[i];
				opt.text = temp[i];
				ppt.add(opt);
			}
			ppt.selectedIndex = 0;
		}
		if(package == "Gold")
		{
			var temp = InvestAssureGold.getPremiumTerm(pt);
			for(var i=0; i<temp.length; i++){
				opt = document.createElement("OPTION");
				opt.value = temp[i];
				opt.text = temp[i];
				ppt.add(opt);
			}
			ppt.selectedIndex = 0;
		}
		break ;

	case "LifeLongAssure":
		for(var i=0; i<LifeLongAssure.PremiumTerm.length ; i++){
			opt = document.createElement("OPTION");
			opt.value = LifeLongAssure.PremiumTerm[i];
			opt.text = LifeLongAssure.PremiumTerm[i];
			ppt.add(opt);
		}
		ppt.selectedIndex = 0;		
		break ;

	case "GuaranteeAssure":
		opt = document.createElement("OPTION");
		opt.value = 5;
		opt.text = 5;
		ppt.add(opt);
		ppt.selectedIndex = 0;		
		break ;

	case "ISecure":
		opt = document.createElement("OPTION");
		opt.value = pt;
		opt.text = pt;
		ppt.add(opt);
		break ;

	} // end switch	

}




/////////////////////////////////////////
//////////// validate SA ////////////////



function validateSA()
{
	var plan = document.getElementById("plan").value ;
	//var package = document.getElementById("package").value ;
	var saEle = document.getElementById("sumAssured") ;
	var sa = saEle.value ;
	var nonDigit = /\D/i ;
	var leadZero = /^0/ ;

	if( nonDigit.test(sa) || leadZero.test(sa) || sa == "" )
	{
		alert("Please enter correct Sum Assured");
		saEle.focus();
		return false;
	}

	switch( plan )
	{
	case "InvestAssure":
	case "LifeLongAssure" :
	case "GuaranteeAssure" :
		if(sa < 100000){
			alert("Sum Assured must be 100000 or more and multiple of 1000");
			saEle.focus();
			return false;			
		}
		if(sa % 1000 != 0 ){
			alert("Sum Assured must be multiple of 1000");
			saEle.focus();
			return false;			
		}
		break ;
	case "ISecure" :
		if(sa < 250000 || sa > 1000000000){
			alert("Sum Assured cannot be less than 250000 or more than 100 Crore");
			saEle.focus();
			return false;			
		}
		if(sa < 2000000 && (sa % 50000) != 0 ){
			alert("Sum Assured must be multiple of 50000");
			saEle.focus();
			return false;			
		}
		if(sa >= 2000000 && (sa % 100000) != 0 ){
			alert("Sum Assured must be multiple of 100000");
			saEle.focus();
			return false;			
		}
		break ;
	}

}



function calculatePremium(){
	var plan = document.getElementById("plan").value ;
	var package = document.getElementById("package").value ;
	var entryAge = document.getElementById("age").value ;
	var pt = document.getElementById("policyTerm").value ;
	var ppt = document.getElementById("premiumTerm").value ;
	
	alert( ISecure.getFemaleRateNonSmoker( entryAge, pt));	
}


/*
 * Invest Assure Silver premuim rate
 * 
 * 
 * 
 * For Age less than 18 premium rate of 18 will be applicable										
 * Premium rate given above are the per 1000 sum assured for male life										
 * Premium rate for female life will be with an age set back of 3 years from the given rates
 * 
 * Columns denote Policy Term from 17 - 40 year
 * Row denote Age from 18 - 50 years
 * 
>>>>>>>>>>>>>>>>>>>>>>>> PT ( 17-40) >>>>>>>>>>>>>>>>>>>>>>>
Age (18-50)
G
E


Premium rate of Invest Assure Silver PPT 7 years
*/
var InvestAssureSilver7 = [
[116.87,114.25,111.74,109.34,107.05,104.87,102.79,100.82,98.94,97.16,95.48,93.89,92.39,90.98,89.66,88.42,87.27,86.20,85.21,84.30,83.46,82.70,82.01,81.39],
[116.91,114.29,111.79,109.39,107.11,104.93,102.86,100.90,99.03,97.26,95.58,94.00,92.51,91.12,89.81,88.58,87.45,86.39,85.42,84.52,83.70,82.95,82.28,81.67],
[116.95,114.33,111.83,109.44,107.17,105.00,102.93,100.97,99.12,97.35,95.69,94.12,92.65,91.26,89.97,88.76,87.64,86.60,85.64,84.76,83.96,83.22,82.57,81.98],
[116.99,114.38,111.88,109.50,107.23,105.06,103.01,101.06,99.21,97.46,95.81,94.25,92.79,91.42,90.14,88.95,87.85,86.83,85.88,85.02,84.23,83.52,82.88,82.30],
[117.03,114.42,111.93,109.55,107.29,105.14,103.09,101.15,99.31,97.58,95.94,94.40,92.95,91.60,90.34,89.17,88.08,87.07,86.15,85.30,84.53,83.84,83.21,82.67],
[117.07,114.47,111.98,109.62,107.36,105.22,103.18,101.25,99.43,97.71,96.09,94.56,93.13,91.80,90.56,89.40,88.33,87.34,86.44,85.61,84.86,84.18,83.59,83.07],
[117.12,114.52,112.05,109.69,107.44,105.31,103.29,101.37,99.57,97.86,96.25,94.75,93.34,92.02,90.80,89.66,88.61,87.64,86.76,85.95,85.22,84.57,84.01,83.51],
[117.17,114.58,112.12,109.77,107.54,105.42,103.41,101.51,99.72,98.03,96.45,94.96,93.57,92.27,91.07,89.95,88.92,87.97,87.11,86.32,85.62,85.01,84.46,83.99],
[117.24,114.66,112.20,109.87,107.65,105.55,103.55,101.67,99.90,98.23,96.66,95.20,93.83,92.55,91.37,90.27,89.26,88.34,87.49,86.74,86.07,85.48,84.96,84.52],
[117.32,114.75,112.31,109.98,107.78,105.69,103.72,101.86,100.10,98.45,96.91,95.46,94.11,92.86,91.70,90.63,89.64,88.74,87.93,87.21,86.57,86.00,85.51,85.09],
[117.41,114.85,112.43,110.12,107.93,105.86,103.91,102.07,100.33,98.71,97.19,95.76,94.44,93.21,92.07,91.02,90.05,89.19,88.42,87.72,87.11,86.57,86.11,85.72],
[117.52,114.98,112.57,110.28,108.11,106.06,104.13,102.31,100.60,99.00,97.50,96.10,94.79,93.59,92.47,91.45,90.53,89.70,88.95,88.29,87.70,87.20,86.76,86.40],
[117.65,115.12,112.73,110.46,108.31,106.29,104.38,102.58,100.90,99.32,97.84,96.47,95.19,94.01,92.92,91.94,91.05,90.25,89.54,88.90,88.35,87.88,87.48,87.15],
[117.80,115.29,112.92,110.67,108.55,106.55,104.66,102.89,101.23,99.67,98.22,96.88,95.63,94.47,93.43,92.49,91.63,90.86,90.18,89.58,89.06,88.62,88.25,0.00],
[117.97,115.49,113.14,110.91,108.81,106.84,104.98,103.23,101.60,100.07,98.65,97.33,96.11,95.00,93.99,93.08,92.26,91.52,90.88,90.31,89.83,89.43,0.00,0.00],
[118.17,115.71,113.39,111.19,109.12,107.16,105.33,103.61,102.01,100.51,99.11,97.82,96.65,95.58,94.61,93.73,92.95,92.25,91.64,91.11,90.67,0.00,0.00,0.00],
[118.40,115.97,113.67,111.50,109.45,107.53,105.72,104.03,102.46,100.99,99.62,98.39,97.25,96.22,95.28,94.44,93.70,93.04,92.47,91.98,0.00,0.00,0.00,0.00],
[118.67,116.26,113.98,111.84,109.82,107.93,106.15,104.50,102.95,101.51,100.21,99.01,97.91,96.91,96.02,95.22,94.51,93.90,93.37,0.00,0.00,0.00,0.00,0.00],
[118.96,116.58,114.34,112.22,110.24,108.37,106.63,105.00,103.49,102.11,100.84,99.68,98.62,97.67,96.82,96.06,95.40,94.82,0.00,0.00,0.00,0.00,0.00,0.00],
[119.29,116.94,114.73,112.65,110.69,108.86,107.15,105.56,104.10,102.76,101.54,100.42,99.40,98.50,97.69,96.97,96.36,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[119.66,117.34,115.16,113.11,111.19,109.39,107.72,106.19,104.77,103.48,102.29,101.22,100.25,99.39,98.63,97.96,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[120.07,117.79,115.64,113.62,111.74,109.98,108.36,106.88,105.51,104.26,103.12,102.09,101.17,100.36,99.65,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[120.53,118.27,116.16,114.18,112.33,110.64,109.07,107.63,106.31,105.10,104.02,103.04,102.17,101.41,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[121.02,118.81,116.73,114.79,113.01,111.36,109.84,108.45,107.17,106.02,104.99,104.07,103.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[121.57,119.39,117.35,115.48,113.75,112.15,110.68,109.34,108.12,107.02,106.04,105.18,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[122.17,120.03,118.06,116.24,114.56,113.01,111.59,110.31,109.14,108.10,107.18,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[122.81,120.75,118.83,117.06,115.43,113.94,112.58,111.35,110.25,109.27,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[123.55,121.54,119.67,117.96,116.38,114.95,113.65,112.49,111.45,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[124.35,122.39,120.58,118.92,117.41,116.04,114.81,113.71,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[125.20,123.30,121.56,119.96,118.52,117.21,116.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[126.13,124.29,122.61,121.08,119.70,118.46,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[127.11,125.34,123.73,122.27,120.96,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[128.16,126.46,124.92,123.54,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;



/*
* Invest Assure Silver premuim rate
>>>>>>>>>>>>>>>>>>>>>>>> PT ( 17-40) >>>>>>>>>>>>>>>>>>>>>>>
Age (18-50)
G
E


Premium rate of Invest Assure Silver PPT 10 years
*/
var InvestAssureSilver10 = [
[0.00,0.00,0.00,81.52,79.83,78.23,76.70,75.24,73.86,72.55,71.31,70.13,69.03,67.99,67.01,66.10,65.25,64.47,63.74,63.06,62.45,61.89,61.38,60.92],
[0.00,0.00,0.00,81.56,79.88,78.27,76.75,75.30,73.92,72.62,71.38,70.22,69.12,68.09,67.13,66.22,65.39,64.61,63.89,63.23,62.63,62.07,61.58,61.13],
[0.00,0.00,0.00,81.60,79.92,78.32,76.80,75.36,73.99,72.69,71.46,70.31,69.22,68.20,67.25,66.36,65.53,64.76,64.06,63.41,62.82,62.28,61.79,61.36],
[0.00,0.00,0.00,81.64,79.97,78.37,76.86,75.42,74.06,72.77,71.55,70.41,69.33,68.32,67.38,66.50,65.68,64.93,64.24,63.60,63.02,62.49,62.02,61.60],
[0.00,0.00,0.00,81.68,80.02,78.43,76.92,75.49,74.14,72.86,71.65,70.51,69.45,68.45,67.52,66.66,65.86,65.11,64.43,63.81,63.24,62.73,62.27,61.87],
[0.00,0.00,0.00,81.73,80.07,78.49,76.99,75.57,74.22,72.96,71.76,70.64,69.58,68.60,67.68,66.83,66.04,65.32,64.65,64.04,63.48,62.99,62.55,62.17],
[0.00,0.00,0.00,81.79,80.13,78.56,77.07,75.66,74.33,73.07,71.89,70.78,69.74,68.77,67.86,67.03,66.25,65.54,64.88,64.29,63.75,63.28,62.86,62.49],
[0.00,0.00,0.00,81.85,80.21,78.64,77.16,75.76,74.44,73.20,72.03,70.93,69.91,68.95,68.06,67.24,66.48,65.78,65.15,64.57,64.05,63.60,63.20,62.85],
[0.00,0.00,0.00,81.93,80.29,78.74,77.27,75.88,74.58,73.35,72.19,71.11,70.10,69.16,68.29,67.48,66.74,66.05,65.43,64.88,64.39,63.95,63.57,63.24],
[0.00,0.00,0.00,82.02,80.39,78.85,77.40,76.02,74.73,73.52,72.38,71.31,70.32,69.39,68.54,67.75,67.02,66.35,65.76,65.23,64.75,64.34,63.98,63.67],
[0.00,0.00,0.00,82.12,80.51,78.98,77.54,76.19,74.91,73.71,72.59,71.54,70.56,69.65,68.81,68.04,67.33,66.70,66.12,65.61,65.16,64.76,64.42,64.13],
[0.00,0.00,0.00,82.24,80.65,79.14,77.71,76.37,75.11,73.93,72.82,71.79,70.83,69.94,69.12,68.36,67.69,67.07,66.52,66.03,65.60,65.23,64.91,64.64],
[0.00,0.00,0.00,82.39,80.81,79.31,77.90,76.58,75.34,74.17,73.08,72.07,71.13,70.26,69.46,68.73,68.08,67.49,66.96,66.49,66.09,65.74,65.44,65.20],
[0.00,0.00,0.00,82.55,80.99,79.51,78.12,76.81,75.59,74.44,73.37,72.38,71.46,70.61,69.84,69.14,68.51,67.94,67.44,67.00,66.62,66.29,66.02,0.00],
[0.00,0.00,0.00,82.74,81.20,79.74,78.37,77.08,75.87,74.75,73.70,72.72,71.82,71.01,70.26,69.59,68.98,68.44,67.97,67.55,67.19,66.90,0.00,0.00],
[0.00,0.00,0.00,82.96,81.43,79.99,78.64,77.37,76.19,75.08,74.05,73.10,72.24,71.45,70.73,70.08,69.50,68.99,68.54,68.15,67.82,0.00,0.00,0.00],
[0.00,0.00,0.00,83.20,81.69,80.27,78.94,77.70,76.53,75.45,74.44,73.53,72.69,71.93,71.24,70.62,70.07,69.58,69.16,68.80,,0.00,0.00,0.00],
[0.00,0.00,0.00,83.47,81.98,80.59,79.28,78.05,76.91,75.85,74.89,74.00,73.19,72.46,71.80,71.21,70.69,70.23,69.84,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,83.78,82.31,80.93,79.65,78.45,77.33,76.31,75.37,74.52,73.74,73.03,72.40,71.85,71.36,70.93,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,84.11,82.67,81.32,80.05,78.88,77.80,76.81,75.91,75.08,74.33,73.66,73.07,72.54,72.08,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,84.48,83.06,81.74,80.50,79.37,78.32,77.37,76.49,75.70,74.99,74.35,73.78,73.29,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,84.89,83.50,82.20,81.01,79.91,78.89,77.97,77.13,76.37,75.69,75.09,74.57,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,85.34,83.97,82.72,81.56,80.50,79.52,78.63,77.83,77.10,76.46,75.90,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,85.83,84.52,83.30,82.17,81.14,80.20,79.35,78.58,77.90,77.30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,86.39,85.11,83.92,82.84,81.84,80.94,80.13,79.41,78.76,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,87.01,85.76,84.61,83.56,82.61,81.75,80.98,80.30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,87.67,86.47,85.36,84.35,83.44,82.63,81.90,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,88.40,87.23,86.17,85.21,84.34,83.57,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,89.19,88.06,87.04,86.13,85.31,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,90.03,88.95,87.98,87.12,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,90.94,89.91,88.99,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,91.90,90.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,92.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;



/*
* Invest Assure Silver premuim rate
>>>>>>>>>>>>>>>>>>>>>>>> PT ( 17-40) >>>>>>>>>>>>>>>>>>>>>>>
Age (18-50)
G
E


Premium rate of Invest Assure Silver PPT 15 years
*/

var InvestAssureSilver15 = [
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,53.87,52.93,52.05,51.21,50.42,49.68,48.99,48.34,47.73,47.17,46.65,46.17,45.73,45.33,44.97,44.64],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,53.91,52.98,52.10,51.27,50.49,49.76,49.07,48.43,47.83,47.27,46.76,46.29,45.86,45.47,45.11,44.79],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,53.96,53.04,52.16,51.34,50.56,49.84,49.16,48.52,47.93,47.39,46.88,46.42,46.00,45.61,45.27,44.96],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.02,53.10,52.23,51.41,50.64,49.92,49.25,48.63,48.04,47.51,47.01,46.56,46.14,45.77,45.43,45.13],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.07,53.16,52.30,51.49,50.73,50.02,49.36,48.74,48.17,47.64,47.15,46.71,46.31,45.94,45.61,45.33],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.14,53.24,52.38,51.58,50.83,50.13,49.48,48.87,48.31,47.79,47.31,46.88,46.48,46.13,45.82,45.54],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.22,53.32,52.48,51.69,50.94,50.25,49.61,49.01,48.46,47.95,47.48,47.06,46.67,46.34,46.04,45.78],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.31,53.42,52.59,51.80,51.07,50.39,49.76,49.17,48.63,48.13,47.67,47.26,46.90,46.57,46.29,46.04],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.41,53.53,52.71,51.94,51.22,50.55,49.92,49.35,48.82,48.33,47.89,47.49,47.14,46.83,46.56,46.32],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.53,53.66,52.85,52.09,51.38,50.72,50.11,49.54,49.02,48.55,48.13,47.75,47.41,47.11,46.85,46.63],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.66,53.81,53.01,52.26,51.56,50.91,50.31,49.76,49.25,48.80,48.39,48.03,47.70,47.42,47.18,46.97],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.82,53.97,53.18,52.45,51.76,51.13,50.54,50.00,49.52,49.08,48.69,48.34,48.03,47.76,47.54,47.35],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,54.99,54.16,53.38,52.66,51.99,51.37,50.79,50.28,49.81,49.39,49.01,48.68,48.39,48.14,47.93,47.76],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.19,54.37,53.61,52.90,52.24,51.63,51.08,50.58,50.13,49.73,49.37,49.05,48.78,48.55,48.35,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.41,54.60,53.85,53.16,52.51,51.93,51.40,50.92,50.49,50.10,49.76,49.46,49.21,48.99,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.65,54.86,54.13,53.45,52.83,52.26,51.75,51.29,50.87,50.51,50.19,49.91,49.67,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.92,55.15,54.43,53.78,53.18,52.63,52.14,51.69,51.30,50.95,50.65,50.40,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.22,55.46,54.77,54.14,53.56,53.03,52.56,52.14,51.77,51.44,51.16,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.55,55.82,55.15,54.54,53.98,53.48,53.02,52.62,52.27,51.97,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.93,56.22,55.57,54.98,54.44,53.96,53.53,53.15,52.83,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,57.34,56.65,56.02,55.46,54.94,54.49,54.08,53.73,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,57.79,57.13,56.53,55.98,55.50,55.06,54.69,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,58.29,57.65,57.08,56.56,56.10,55.69,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,58.84,58.22,57.67,57.18,56.75,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,59.43,58.85,58.33,57.86,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,60.08,59.52,59.03,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,60.78,60.26,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,61.54,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;



/*
* Invest Assure Silver premuim rate
>>>>>>>>>>>>>>>>>>>>>>>> PT ( 17-40) >>>>>>>>>>>>>>>>>>>>>>>
Age (18-50)
G
E


Premium rate of Invest Assure Silver PPT PT-10 years
*/

var InvestAssureSilverX = [
[116.87,101.58,89.84,81.52,73.85,67.47,62.15,57.65,53.87,50.46,47.52,44.95,42.70,40.72,38.97,37.42,36.04,34.81,33.71,32.73,31.85,31.07,30.37,29.75],
[116.91,101.62,89.88,81.56,73.89,67.51,62.19,57.70,53.91,50.51,47.57,45.01,42.76,40.78,39.04,37.49,36.11,34.88,33.79,32.81,31.94,31.16,30.47,29.85],
[116.95,101.66,89.92,81.60,73.93,67.55,62.23,57.74,53.96,50.57,47.63,45.07,42.82,40.85,39.11,37.56,36.19,34.97,33.88,32.91,32.04,31.27,30.58,29.96],
[116.99,101.70,89.96,81.64,73.98,67.60,62.28,57.79,54.02,50.62,47.69,45.13,42.89,40.93,39.19,37.65,36.28,35.06,33.98,33.01,32.14,31.37,30.69,30.08],
[117.03,101.74,90.00,81.68,74.02,67.65,62.33,57.85,54.07,50.69,47.76,45.20,42.97,41.01,39.27,37.74,36.37,35.16,34.08,33.12,32.26,31.50,30.81,30.21],
[117.07,101.78,90.04,81.73,74.07,67.70,62.39,57.91,54.14,50.76,47.83,45.29,43.06,41.10,39.37,37.84,36.48,35.27,34.20,33.24,32.39,31.63,30.96,30.36],
[117.12,101.83,90.10,81.79,74.13,67.76,62.46,57.98,54.22,50.84,47.92,45.38,43.16,41.20,39.48,37.95,36.60,35.40,34.33,33.38,32.53,31.78,31.11,30.52],
[117.17,101.89,90.16,81.85,74.20,67.84,62.54,58.07,54.31,50.93,48.02,45.48,43.27,41.32,39.60,38.08,36.73,35.54,34.47,33.53,32.69,31.94,31.29,30.70],
[117.24,101.96,90.23,81.93,74.28,67.92,62.63,58.16,54.41,51.04,48.13,45.60,43.39,41.45,39.74,38.23,36.88,35.69,34.63,33.70,32.87,32.13,31.48,30.90],
[117.32,102.04,90.31,82.02,74.38,68.02,62.73,58.27,54.53,51.17,48.26,45.74,43.54,41.60,39.89,38.38,37.05,35.86,34.82,33.89,33.06,32.33,31.69,31.12],
[117.41,102.13,90.41,82.12,74.49,68.14,62.85,58.40,54.66,51.31,48.41,45.89,43.69,41.76,40.06,38.56,37.23,36.06,35.02,34.10,33.28,32.56,31.92,31.36],
[117.52,102.24,90.53,82.24,74.61,68.27,63.00,58.55,54.82,51.47,48.58,46.07,43.87,41.95,40.26,38.76,37.44,36.28,35.25,34.33,33.53,32.81,32.18,31.63],
[117.65,102.38,90.66,82.39,74.76,68.43,63.16,58.72,54.99,51.65,48.76,46.26,44.07,42.15,40.47,38.99,37.68,36.52,35.50,34.59,33.79,33.09,32.47,31.92],
[117.80,102.53,90.82,82.55,74.94,68.61,63.34,58.91,55.19,51.85,48.97,46.47,44.29,42.38,40.71,39.24,37.94,36.79,35.77,34.88,34.09,33.39,32.78,0.00],
[117.97,102.71,91.00,82.74,75.13,68.81,63.55,59.12,55.41,52.08,49.20,46.71,44.54,42.64,40.98,39.52,38.22,37.08,36.08,35.19,34.41,33.72,0.00,0.00],
[118.17,102.91,91.21,82.96,75.35,69.03,63.78,59.36,55.65,52.33,49.46,46.98,44.82,42.93,41.28,39.82,38.54,37.41,36.41,35.53,34.76,0.00,0.00,0.00],
[118.40,103.14,91.45,83.20,75.60,69.28,64.04,59.62,55.92,52.60,49.74,47.28,45.13,43.25,41.60,40.16,38.89,37.77,36.78,35.91,0.00,0.00,0.00,0.00],
[118.67,103.41,91.71,83.47,75.87,69.56,64.32,59.91,56.22,52.91,50.07,47.61,45.47,43.60,41.97,40.53,39.27,38.16,37.18,0.00,0.00,0.00,0.00,0.00],
[118.96,103.70,92.01,83.78,76.18,69.87,64.64,60.24,56.55,53.26,50.43,47.97,45.85,43.99,42.36,40.94,39.68,38.58,0.00,0.00,0.00,0.00,0.00,0.00],
[119.29,104.03,92.33,84.11,76.52,70.22,64.99,60.59,56.93,53.64,50.82,48.38,46.26,44.41,42.79,41.38,40.14,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[119.66,104.39,92.70,84.48,76.89,70.60,65.37,60.99,57.34,54.06,51.25,48.82,46.71,44.87,43.27,41.86,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[120.07,104.80,93.10,84.89,77.30,71.01,65.81,61.44,57.79,54.53,51.72,49.30,47.20,45.38,43.78,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[120.53,105.24,93.54,85.34,77.76,71.48,66.29,61.93,58.29,55.03,52.24,49.83,47.74,45.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[121.02,105.73,94.03,85.83,78.27,72.00,66.81,62.46,58.84,55.59,52.80,50.40,48.33,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[121.57,106.27,94.56,86.39,78.83,72.57,67.39,63.05,59.43,56.19,53.42,51.03,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[122.17,106.85,95.16,87.01,79.45,73.19,68.02,63.68,60.08,56.85,54.09,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[122.81,107.52,95.82,87.67,80.12,73.87,68.70,64.37,60.78,57.56,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[123.55,108.24,96.54,88.40,80.85,74.60,69.44,65.12,61.54,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[124.35,109.02,97.31,89.19,81.64,75.39,70.24,65.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[125.20,109.86,98.15,90.03,82.48,76.24,71.09,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[126.13,110.77,99.04,90.94,83.39,77.15,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[127.11,111.73,100.00,91.90,84.36,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[128.16,112.76,101.02,92.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Premium Rate for Invest Assure Gold //////////////////////////////////////////////////////////


/*
-> PT ( 15-40)
|  Age (18-50)
v


Premium rate of Invest Assure Gold PPT 5 years
*/

var InvestAssureGold5 = [
[170.08,166.30,162.69,159.24,155.96,152.84,149.87,147.05,144.39,141.87,139.50,137.27,135.19,133.25,131.46,129.81,128.29,126.92,125.69,124.59,123.63,122.79,122.08,121.49,121.01,120.64],
[170.18,166.41,162.81,159.38,156.11,153.01,150.06,147.26,144.62,142.13,139.79,137.60,135.55,133.66,131.91,130.30,128.84,127.52,126.35,125.31,124.40,123.62,122.96,122.42,121.99,121.68],
[170.27,166.51,162.93,159.52,156.27,153.18,150.26,147.49,144.87,142.41,140.11,137.95,135.95,134.10,132.40,130.85,129.44,128.18,127.07,126.08,125.23,124.50,123.90,123.42,123.05,122.79],
[170.37,166.63,163.06,159.66,156.43,153.37,150.47,147.73,145.15,142.72,140.46,138.35,136.39,134.60,132.95,131.46,130.11,128.91,127.85,126.93,126.13,125.47,124.92,124.50,124.19,123.99],
[170.47,166.75,163.20,159.82,156.62,153.58,150.71,148.00,145.46,143.07,140.85,138.79,136.89,135.15,133.57,132.14,130.85,129.71,128.72,127.85,127.12,126.51,126.03,125.66,125.41,125.35],
[170.59,166.88,163.35,160.00,156.83,153.82,150.98,148.31,145.81,143.47,141.31,139.30,137.46,135.78,134.26,132.89,131.67,130.60,129.66,128.86,128.19,127.65,127.22,126.92,126.82,126.84],
[170.72,167.04,163.54,160.21,157.07,154.09,151.30,148.67,146.22,143.94,141.82,139.88,138.11,136.49,135.04,133.73,132.58,131.57,130.70,129.97,129.36,128.88,128.52,128.38,128.35,128.44],
[170.88,167.22,163.75,160.46,157.35,154.41,151.66,149.09,146.69,144.47,142.42,140.54,138.83,137.29,135.90,134.67,133.58,132.64,131.84,131.17,130.63,130.22,130.02,129.95,130.01,130.19],
[171.06,167.44,164.00,160.74,157.67,154.79,152.09,149.57,147.24,145.08,143.10,141.29,139.66,138.18,136.87,135.70,134.69,133.82,133.08,132.48,132.02,131.77,131.66,131.67,131.81,0.00],
[171.28,167.69,164.29,161.08,158.06,155.23,152.59,150.13,147.87,145.78,143.87,142.14,140.57,139.17,137.93,136.84,135.90,135.10,134.44,133.92,133.62,133.46,133.43,133.54,0.00,0.00],
[171.54,167.99,164.63,161.47,158.51,155.74,153.17,150.78,148.59,146.57,144.74,143.09,141.60,140.27,139.11,138.09,137.22,136.50,135.92,135.57,135.36,135.30,135.36,0.00,0.00,0.00],
[171.85,168.34,165.04,161.93,159.03,156.33,153.83,151.52,149.40,147.47,145.72,144.14,142.73,141.49,140.40,139.46,138.67,138.03,137.63,137.37,137.26,137.29,0.00,0.00,0.00,0.00],
[172.21,168.75,165.51,162.47,159.64,157.01,154.59,152.36,150.32,148.47,146.80,145.31,143.98,142.81,141.80,140.95,140.25,139.79,139.49,139.33,139.32,0.00,0.00,0.00,0.00,0.00],
[172.63,169.24,166.06,163.09,160.34,157.79,155.45,153.31,151.35,149.59,148.00,146.59,145.34,144.26,143.34,142.57,142.06,141.71,141.51,141.46,0.00,0.00,0.00,0.00,0.00,0.00],
[173.12,169.79,166.69,163.80,161.13,158.67,156.42,154.36,152.50,150.82,149.32,147.99,146.83,145.84,145.01,144.44,144.04,143.79,143.70,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[173.68,170.44,167.41,164.61,162.03,159.66,157.50,155.53,153.76,152.17,150.76,149.52,148.45,147.55,146.93,146.47,146.18,146.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[174.33,171.17,168.24,165.53,163.04,160.76,158.69,156.82,155.14,153.64,152.32,151.18,150.21,149.53,149.02,148.68,148.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[175.08,172.01,169.17,166.55,164.16,161.98,160.00,158.23,156.64,155.24,154.02,152.98,152.24,151.67,151.28,151.06,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[175.92,172.94,170.20,167.69,165.40,163.32,161.44,159.76,158.27,156.97,155.86,155.05,154.43,153.99,153.73,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[176.87,173.99,171.36,168.94,166.75,164.77,163.00,161.42,160.04,158.86,157.98,157.30,156.81,156.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[177.93,175.16,172.62,170.32,168.23,166.36,164.69,163.22,161.96,161.02,160.28,159.73,159.37,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[179.10,176.44,174.01,171.82,169.84,168.08,166.52,165.18,164.16,163.36,162.75,162.35,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[180.38,177.84,175.53,173.44,171.58,169.93,168.50,167.42,166.55,165.89,165.43,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[181.79,179.36,177.17,175.20,173.46,171.94,170.78,169.84,169.12,168.61,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[183.33,181.01,178.94,177.10,175.49,174.25,173.24,172.46,171.90,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[184.98,182.79,180.85,179.14,177.82,176.74,175.89,175.28,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[186.76,184.71,182.90,181.50,180.34,179.43,178.75,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[188.67,186.76,185.27,184.03,183.05,182.31,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[190.72,189.13,187.81,186.75,185.95,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[193.08,191.67,190.53,189.67,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[195.60,194.38,193.44,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[198.28,197.27,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[200.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;


/*
-> PT ( 15-40)
|  Age (18-50)
v


Premium rate of Invest Assure Gold PPT 7 years
*/
var InvestAssureGold7 = [
[124.70,121.95,119.32,116.81,114.42,112.14,109.98,107.93,105.99,104.15,102.43,100.81,99.29,97.88,96.57,95.37,94.27,93.27,92.37,91.57,90.87,90.26,89.74,89.31,88.96,88.69],
[124.78,122.03,119.41,116.91,114.53,112.27,110.12,108.09,106.16,104.35,102.64,101.04,99.55,98.17,96.90,95.73,94.67,93.71,92.85,92.09,91.43,90.86,90.38,89.99,89.68,89.45],
[124.85,122.11,119.50,117.01,114.65,112.40,110.27,108.25,106.34,104.55,102.87,101.30,99.85,98.50,97.26,96.13,95.11,94.19,93.37,92.66,92.04,91.51,91.07,90.72,90.45,90.26],
[124.92,122.19,119.59,117.12,114.77,112.54,110.42,108.43,106.55,104.78,103.13,101.59,100.17,98.86,97.66,96.57,95.59,94.72,93.95,93.27,92.70,92.21,91.81,91.50,91.28,91.13],
[125.00,122.28,119.70,117.24,114.90,112.69,110.60,108.63,106.77,105.04,103.42,101.92,100.54,99.27,98.11,97.07,96.13,95.31,94.58,93.95,93.41,92.97,92.62,92.35,92.17,92.13],
[125.08,122.38,119.81,117.37,115.06,112.87,110.80,108.85,107.03,105.33,103.75,102.29,100.95,99.73,98.62,97.62,96.73,95.95,95.27,94.68,94.20,93.80,93.49,93.27,93.20,93.21],
[125.18,122.50,119.95,117.53,115.23,113.07,111.03,109.12,107.33,105.67,104.13,102.71,101.42,100.24,99.18,98.24,97.40,96.66,96.03,95.49,95.05,94.70,94.44,94.33,94.31,94.38],
[125.30,122.63,120.10,117.71,115.44,113.30,111.30,109.42,107.68,106.06,104.57,103.20,101.95,100.83,99.82,98.92,98.13,97.44,96.86,96.37,95.98,95.68,95.54,95.48,95.52,95.66],
[125.43,122.79,120.29,117.92,115.68,113.58,111.61,109.78,108.08,106.51,105.06,103.75,102.55,101.48,100.52,99.67,98.93,98.30,97.76,97.33,96.99,96.81,96.73,96.74,96.84,0.00],
[125.60,122.98,120.50,118.16,115.96,113.90,111.98,110.19,108.54,107.02,105.63,104.37,103.23,102.21,101.30,100.51,99.82,99.24,98.76,98.37,98.16,98.04,98.02,98.10,0.00,0.00],
[125.79,123.20,120.76,118.45,116.30,114.28,112.40,110.67,109.07,107.60,106.27,105.06,103.98,103.01,102.16,101.42,100.79,100.26,99.84,99.58,99.43,99.38,99.43,0.00,0.00,0.00],
[126.02,123.46,121.06,118.80,116.68,114.71,112.89,111.21,109.67,108.26,106.98,105.83,104.80,103.90,103.10,102.42,101.84,101.38,101.09,100.90,100.82,100.84,0.00,0.00,0.00,0.00],
[126.29,123.77,121.41,119.19,117.13,115.22,113.45,111.83,110.34,108.99,107.78,106.69,105.72,104.87,104.13,103.51,103.00,102.67,102.45,102.33,102.33,0.00,0.00,0.00,0.00,0.00],
[126.60,124.13,121.81,119.65,117.65,115.79,114.08,112.52,111.10,109.81,108.66,107.63,106.72,105.93,105.26,104.70,104.33,104.07,103.93,103.89,0.00,0.00,0.00,0.00,0.00,0.00],
[126.97,124.54,122.28,120.18,118.23,116.44,114.80,113.30,111.94,110.72,109.62,108.66,107.81,107.09,106.48,106.07,105.78,105.60,105.53,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[127.39,125.02,122.82,120.78,118.90,117.17,115.59,114.16,112.87,111.71,110.68,109.78,109.00,108.35,107.89,107.56,107.35,107.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[127.88,125.57,123.43,121.46,119.64,117.98,116.47,115.11,113.88,112.79,111.83,111.00,110.29,109.80,109.42,109.18,109.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[128.43,126.19,124.12,122.22,120.47,118.88,117.44,116.15,114.99,113.97,113.08,112.33,111.78,111.37,111.08,110.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[129.06,126.89,124.89,123.06,121.39,119.87,118.50,117.28,116.20,115.25,114.44,113.85,113.40,113.07,112.88,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[129.77,127.68,125.75,123.99,122.40,120.95,119.66,118.51,117.51,116.64,116.00,115.50,115.14,114.92,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[130.57,128.55,126.70,125.02,123.50,122.13,120.91,119.85,118.92,118.24,117.69,117.29,117.03,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[131.44,129.51,127.74,126.14,124.69,123.41,122.27,121.29,120.55,119.97,119.52,119.23,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[132.41,130.56,128.87,127.35,125.99,124.79,123.75,122.95,122.32,121.84,121.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[133.48,131.70,130.10,128.67,127.39,126.29,125.44,124.76,124.23,123.86,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[134.64,132.95,131.43,130.09,128.91,128.01,127.27,126.70,126.29,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[135.89,134.29,132.87,131.63,130.66,129.87,129.26,128.80,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[137.24,135.74,134.43,133.40,132.55,131.89,131.39,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[138.70,137.30,136.21,135.31,134.59,134.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[140.26,139.10,138.14,137.36,136.78,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[142.06,141.03,140.20,139.56,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[142.70,142.60,142.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[142.80,142.65,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[142.85,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
];



/*
-> PT ( 15-40)
|  Age (18-50)
v


Premium rate of Invest Assure Gold PPT 10 years
*/

var InvestAssureGold10 = [
[0.00,0.00,0.00,0.00,0.00,83.58,81.99,80.48,79.05,77.70,76.43,75.23,74.11,73.07,72.11,71.22,70.41,69.67,69.01,68.42,67.91,67.46,67.07,66.76,66.50,66.30],
[0.00,0.00,0.00,0.00,0.00,83.68,82.10,80.60,79.18,77.84,76.58,75.41,74.31,73.29,72.35,71.49,70.71,70.00,69.37,68.81,68.32,67.90,67.55,67.26,67.03,66.86],
[0.00,0.00,0.00,0.00,0.00,83.78,82.21,80.72,79.32,77.99,76.76,75.60,74.53,73.53,72.62,71.79,71.03,70.36,69.76,69.23,68.77,68.38,68.06,67.80,67.60,67.46],
[0.00,0.00,0.00,0.00,0.00,83.88,82.32,80.85,79.47,78.16,76.95,75.81,74.77,73.80,72.92,72.12,71.39,70.75,70.18,69.68,69.26,68.90,68.61,68.38,68.21,68.11],
[0.00,0.00,0.00,0.00,0.00,84.00,82.45,81.00,79.63,78.36,77.16,76.06,75.04,74.10,73.25,72.48,71.79,71.18,70.65,70.18,69.79,69.46,69.20,69.01,68.87,68.84],
[0.00,0.00,0.00,0.00,0.00,84.13,82.60,81.17,79.83,78.57,77.41,76.33,75.34,74.44,73.63,72.89,72.24,71.66,71.16,70.73,70.37,70.07,69.85,69.69,69.63,69.64],
[0.00,0.00,0.00,0.00,0.00,84.28,82.78,81.37,80.05,78.82,77.69,76.65,75.69,74.83,74.05,73.35,72.73,72.19,71.72,71.32,71.00,70.74,70.55,70.47,70.46,70.51],
[0.00,0.00,0.00,0.00,0.00,84.46,82.98,81.59,80.31,79.11,78.01,77.01,76.09,75.26,74.51,73.85,73.27,72.76,72.33,71.97,71.68,71.46,71.36,71.32,71.35,71.45],
[0.00,0.00,0.00,0.00,0.00,84.66,83.21,81.86,80.61,79.45,78.38,77.41,76.53,75.74,75.04,74.41,73.87,73.40,73.00,72.68,72.43,72.30,72.24,72.25,72.32,0.00],
[0.00,0.00,0.00,0.00,0.00,84.90,83.49,82.17,80.95,79.83,78.81,77.87,77.03,76.28,75.62,75.03,74.52,74.09,73.74,73.46,73.30,73.21,73.20,73.26,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,85.19,83.81,82.52,81.35,80.27,79.28,78.39,77.59,76.88,76.25,75.71,75.24,74.85,74.54,74.36,74.24,74.21,74.24,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,85.52,84.17,82.93,81.79,80.76,79.82,78.97,78.21,77.54,76.96,76.45,76.03,75.68,75.47,75.33,75.27,75.29,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,85.90,84.59,83.40,82.30,81.31,80.41,79.61,78.89,78.27,77.72,77.26,76.89,76.64,76.48,76.40,76.39,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,86.33,85.07,83.92,82.87,81.92,81.07,80.31,79.64,79.06,78.56,78.15,77.88,77.69,77.58,77.55,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,86.82,85.61,84.50,83.50,82.60,81.79,81.08,80.46,79.92,79.47,79.17,78.95,78.82,78.77,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,87.37,86.21,85.15,84.20,83.34,82.58,81.92,81.35,80.86,80.53,80.28,80.12,80.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,87.99,86.87,85.87,84.96,84.16,83.45,82.84,82.31,81.95,81.67,81.49,81.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,88.67,87.61,86.65,85.80,85.04,84.39,83.83,83.43,83.13,82.92,82.80,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,89.42,88.41,87.51,86.71,86.01,85.41,84.98,84.64,84.40,84.26,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,90.25,89.29,88.44,87.70,87.06,86.59,86.22,85.96,85.79,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,91.14,90.25,89.46,88.77,88.27,87.87,87.57,87.38,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,92.12,91.28,90.56,90.01,89.58,89.25,89.03,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,93.18,92.41,91.83,91.36,91.00,90.75,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,94.34,93.71,93.20,92.81,92.54,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,95.66,95.12,94.70,94.39,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,97.10,96.64,96.31,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,98.66,98.29,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
];



/*
-> PT ( 15-40)
|  Age (18-50)
v


Premium rate of Invest Assure Gold PPT 15 years
*/

var InvestAssureGold15 = [
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.70,54.85,54.05,53.31,52.62,51.99,51.41,50.89,50.42,50.00,49.63,49.31,49.04,48.81,48.63,48.49],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.81,54.98,54.19,53.47,52.80,52.19,51.63,51.12,50.67,50.28,49.93,49.63,49.38,49.17,49.01,48.89],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,55.94,55.12,54.35,53.64,52.99,52.40,51.86,51.38,50.95,50.58,50.25,49.97,49.74,49.56,49.42,49.32],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.08,55.27,54.52,53.84,53.21,52.64,52.12,51.66,51.26,50.90,50.60,50.34,50.14,49.97,49.85,49.78],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.24,55.45,54.72,54.05,53.45,52.90,52.41,51.97,51.59,51.26,50.98,50.75,50.56,50.42,50.33,50.31],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.41,55.65,54.94,54.30,53.72,53.19,52.73,52.32,51.96,51.65,51.40,51.19,51.03,50.91,50.87,50.88],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.62,55.88,55.20,54.58,54.02,53.52,53.08,52.70,52.36,52.08,51.85,51.66,51.53,51.47,51.46,51.50],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,56.86,56.14,55.48,54.89,54.36,53.89,53.47,53.11,52.81,52.55,52.34,52.19,52.11,52.08,52.11,52.17],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,57.13,56.44,55.81,55.24,54.74,54.29,53.91,53.57,53.29,53.06,52.88,52.79,52.75,52.75,52.81,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,57.44,56.77,56.17,55.64,55.16,54.74,54.38,54.08,53.82,53.62,53.51,53.45,53.44,53.48,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,57.79,57.15,56.58,56.07,55.62,55.24,54.90,54.63,54.40,54.27,54.19,54.16,54.19,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,58.18,57.57,57.03,56.55,56.14,55.78,55.47,55.23,55.08,54.98,54.94,54.95,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,58.62,58.04,57.53,57.08,56.70,56.37,56.10,55.93,55.81,55.75,55.75,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,59.10,58.56,58.08,57.66,57.31,57.02,56.82,56.69,56.61,56.59,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,59.64,59.13,58.68,58.30,57.98,57.76,57.61,57.51,57.48,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,60.22,59.75,59.34,58.99,58.75,58.58,58.47,58.42,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,60.87,60.43,60.06,59.79,59.60,59.47,59.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,61.57,61.17,60.88,60.67,60.52,60.43,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,62.34,62.03,61.78,61.61,61.51,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,63.22,62.96,62.77,62.65,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,64.18,63.97,63.83,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,65.23,65.07,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,66.36,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;



/*
-> PT ( 15-40)
|  Age (18-50)
v


Premium rate of Invest Assure Gold PPT PT-10 years
*/
var InvestAssureGoldX = [
[170.08,140.25,119.32,103.85,91.98,83.58,75.84,69.40,64.03,59.50,55.70,52.29,49.34,46.78,44.54,42.58,40.85,39.33,37.99,36.80,35.75,34.83,34.01,33.29,32.65,32.10],
[170.18,140.34,119.41,103.94,92.07,83.68,75.94,69.50,64.13,59.61,55.81,52.41,49.47,46.91,44.69,42.73,41.02,39.51,38.18,37.00,35.96,35.04,34.23,33.52,32.90,32.35],
[170.27,140.43,119.50,104.04,92.17,83.78,76.04,69.60,64.24,59.73,55.94,52.54,49.61,47.07,44.85,42.91,41.20,39.70,38.38,37.22,36.19,35.28,34.48,33.78,33.16,32.62],
[170.37,140.53,119.59,104.13,92.26,83.88,76.15,69.72,64.37,59.86,56.08,52.69,49.77,47.24,45.03,43.10,41.41,39.92,38.61,37.45,36.43,35.54,34.75,34.05,33.44,32.80],
[170.47,140.63,119.70,104.24,92.37,84.00,76.27,69.85,64.50,60.01,56.24,52.86,49.95,47.43,45.23,43.31,41.63,40.16,38.86,37.71,36.70,35.82,35.03,34.35,33.75,32.90],
[170.59,140.74,119.81,104.36,92.50,84.13,76.41,69.99,64.66,60.17,56.41,53.05,50.15,47.64,45.46,43.56,41.89,40.42,39.13,38.00,37.00,36.12,35.35,34.68,34.11,32.95],
[170.72,140.87,119.95,104.49,92.64,84.28,76.57,70.16,64.84,60.37,56.62,53.27,50.38,47.89,45.72,43.82,42.17,40.71,39.43,38.31,37.32,36.45,35.69,35.05,34.20,33.00],
[170.88,141.03,120.10,104.65,92.81,84.46,76.75,70.36,65.05,60.59,56.86,53.52,50.64,48.16,46.00,44.12,42.48,41.03,39.76,38.65,37.67,36.82,36.09,35.30,34.35,33.32],
[171.06,141.21,120.29,104.84,93.00,84.66,76.97,70.59,65.29,60.85,57.13,53.80,50.94,48.47,46.33,44.46,42.82,41.39,40.13,39.03,38.06,37.24,36.53,35.50,34.48,0.00],
[171.28,141.43,120.50,105.06,93.23,84.90,77.23,70.86,65.58,61.14,57.44,54.12,51.28,48.82,46.68,44.82,43.20,41.78,40.53,39.44,38.51,37.70,36.95,35.70,0.00,0.00],
[171.54,141.68,120.76,105.32,93.50,85.19,77.52,71.17,65.90,61.48,57.79,54.48,51.65,49.20,47.08,45.23,43.61,42.20,40.97,39.92,39.00,38.21,37.00,0.00,0.00,0.00],
[171.85,141.98,121.06,105.63,93.81,85.52,77.86,71.52,66.26,61.86,58.18,54.89,52.06,49.63,47.51,45.68,44.07,42.67,41.48,40.44,39.54,38.45,0.00,0.00,0.00,0.00],
[172.21,142.33,121.41,105.98,94.18,85.90,78.25,71.92,66.68,62.28,58.62,55.33,52.52,50.09,47.99,46.16,44.57,43.22,42.04,41.01,40.00,0.00,0.00,0.00,0.00,0.00],
[172.63,142.74,121.81,106.39,94.59,86.33,78.70,72.38,67.14,62.76,59.10,55.83,53.02,50.61,48.52,46.70,45.15,43.81,42.65,41.64,0.00,0.00,0.00,0.00,0.00,0.00],
[173.12,143.21,122.28,106.86,95.07,86.82,79.20,72.88,67.66,63.28,59.64,56.37,53.58,51.17,49.09,47.32,45.79,44.46,43.31,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[173.68,143.76,122.82,107.40,95.61,87.37,79.75,73.45,68.23,63.86,60.22,56.97,54.18,51.79,49.75,48.00,46.48,45.17,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[174.33,144.38,123.43,108.01,96.22,87.99,80.37,74.07,68.86,64.50,60.87,57.62,54.84,52.50,50.48,48.74,47.24,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[175.08,145.09,124.12,108.69,96.89,88.67,81.06,74.76,69.55,65.19,61.57,58.33,55.61,53.27,51.27,49.54,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[175.92,145.89,124.89,109.44,97.64,89.42,81.81,75.51,70.30,65.95,62.34,59.15,56.44,54.12,52.13,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[176.87,146.78,125.75,110.28,98.46,90.25,82.62,76.32,71.12,66.77,63.22,60.04,57.34,55.04,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[177.93,147.77,126.70,111.20,99.36,91.14,83.52,77.21,72.01,67.72,64.18,61.01,58.33,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[179.10,148.86,127.74,112.20,100.34,92.12,84.49,78.18,73.04,68.76,65.23,62.07,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[180.38,150.06,128.87,113.29,101.40,93.18,85.54,79.29,74.15,69.88,66.36,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[181.79,151.36,130.10,114.48,102.56,94.34,86.75,80.50,75.37,71.10,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[183.33,152.77,131.43,115.76,103.81,95.66,88.07,81.82,76.68,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[184.98,154.29,132.87,117.14,105.25,97.10,89.50,83.24,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[186.76,155.93,134.43,118.74,106.81,98.66,90.89,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[188.67,157.70,136.21,120.46,108.49,100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[190.72,159.73,138.14,122.31,110.29,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[193.08,161.91,140.20,124.30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[195.60,164.23,142.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[198.28,166.60,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
[200.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
] ;





/*
 * PREMIUM RATE FOR GUARANTEE ASSURE
 * Guarantee Assure
 * >>> term 7,8,9 >>>>
 * V
 * V
 * V age 9-60
*/

var GuaranteeAssureMaleRate = [
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.39,249.22,261.72],
[238.42,249.24,261.75],
[238.44,249.26,261.77],
[238.45,249.28,261.79],
[238.46,249.30,261.81],
[238.48,249.31,261.83],
[238.48,249.32,261.84],
[238.50,249.33,261.86],
[238.51,249.35,261.88],
[238.52,249.37,261.91],
[238.54,249.40,261.94],
[238.57,249.43,261.99],
[238.60,249.47,262.04],
[238.64,249.52,262.10],
[238.69,249.58,262.17],
[238.74,249.65,262.26],
[238.81,249.73,262.36],
[238.89,249.82,262.47],
[238.98,249.93,262.61],
[239.08,250.06,262.77],
[239.20,250.20,262.95],
[239.34,250.37,263.16],
[239.50,250.57,263.41],
[239.68,250.79,263.69],
[239.89,251.05,264.00],
[240.14,251.35,264.37],
[240.42,251.69,264.78],
[240.74,252.07,265.23],
[241.09,252.49,265.74],
[241.49,252.96,266.29],
[241.92,253.47,266.89],
[242.38,254.01,267.54],
[242.87,254.59,268.22],
[243.40,255.20,268.95],
[243.95,255.85,269.73],
[244.52,256.54,270.63],
[245.13,257.34,271.60],
[245.84,258.20,272.65],
[246.62,259.13,273.79],
[247.46,260.16,275.05],
[248.44,261.35,276.50],
[249.61,262.75,278.21],
[250.99,264.41,280.21]
];




/*
Life Long Assure - Male
>>>> PPT 10,15,20
V
V
V age 10-55
*/

var LifeLongAssureMale = [
[ 183.03 , 134.01 , 108.11], 
[ 183.07 , 134.17 , 108.14], 
[ 183.10 , 134.33 , 108.17], 
[ 183.14 , 134.48 , 108.19], 
[ 183.18 , 134.64 , 108.22], 
[ 183.22 , 134.80 , 108.25], 
[ 183.26 , 134.96 , 108.27], 
[ 183.30 , 135.12 , 108.30], 
[ 183.34 , 135.27 , 108.33], 
[ 183.38 , 135.43 , 108.35], 
[ 183.42 , 135.59 , 108.38], 
[ 183.46 , 135.75 , 108.41], 
[ 183.49 , 135.91 , 108.60], 
[ 183.53 , 136.06 , 108.83], 
[ 183.57 , 136.22 , 109.09], 
[ 183.61 , 136.38 , 109.40], 
[ 183.65 , 136.54 , 109.74], 
[ 183.69 , 136.70 , 110.14], 
[ 183.73 , 136.85 , 110.58], 
[ 183.77 , 137.01 , 111.07], 
[ 183.81 , 137.17 , 111.61], 
[ 183.85 , 137.33 , 112.20], 
[ 183.88 , 137.49 , 112.85], 
[ 183.92 , 137.64 , 113.57], 
[ 183.96 , 137.80 , 114.34], 
[ 184.00 , 137.96 , 115.18], 
[ 184.04 , 138.12 , 116.09], 
[ 184.08 , 138.28 , 117.07], 
[ 184.12 , 138.43 , 118.13], 
[ 184.16 , 138.59 , 119.26], 
[ 184.20 , 139.47 , 120.47], 
[ 184.24 , 140.43 , 121.77], 
[ 184.27 , 141.47 , 123.15], 
[ 184.92 , 142.58 , 124.63], 
[ 185.65 , 143.78 , 126.20], 
[ 186.44 , 145.05 , 127.88], 
[ 187.32 , 146.41 , 129.66], 
[ 188.26 , 147.84 , 131.55], 
[ 189.27 , 149.35 , 133.55], 
[ 189.44 , 150.96 , 135.67], 
[ 189.62 , 152.66 , 137.90], 
[ 189.79 , 154.45 , 140.27], 
[ 189.96 , 156.34 , 140.91], 
[ 190.13 , 158.35 , 141.56], 
[ 190.30 , 158.52 , 142.20], 
[ 190.47 , 158.70 , 142.85] 
] ;


/*
FOR SA < 20 LAC,,,,
">> TERM 10, 15,20,25,30 ------VVV age 18-60",,,,
*/

var ISecureRate = [
[2.29,2.30,2.31,2.32,2.40],
[2.31,2.32,2.33,2.34,2.45],
[2.33,2.33,2.34,2.37,2.49],
[2.34,2.34,2.35,2.41,2.54],
[2.36,2.37,2.38,2.44,2.59],
[2.37,2.38,2.39,2.48,2.66],
[2.38,2.39,2.41,2.53,2.72],
[2.39,2.40,2.45,2.59,2.80],
[2.41,2.41,2.49,2.65,2.89],
[2.42,2.43,2.53,2.72,2.99],
[2.45,2.47,2.59,2.81,3.10],
[2.48,2.51,2.66,2.91,3.23],
[2.51,2.57,2.74,3.02,3.38],
[2.57,2.64,2.85,3.16,3.54],
[2.63,2.73,2.96,3.31,3.73],
[2.71,2.83,3.10,3.48,3.93],
[2.80,2.95,3.26,3.67,4.16],
[2.90,3.08,3.43,3.89,4.42],
[3.27,3.53,3.98,4.54,5.18],
[3.42,3.73,4.24,4.83,5.53],
[3.60,3.96,4.52,5.16,5.92],
[3.80,4.22,4.82,5.53,6.35],
[4.02,4.51,5.16,5.93,6.82],
[4.27,4.82,5.52,6.36,0.00],
[4.55,5.16,5.92,6.83,0.00],
[4.87,5.54,6.37,7.36,0.00],
[5.23,5.96,6.87,7.95,0.00],
[5.64,6.43,7.42,8.61,0.00],
[6.08,6.93,8.02,0.00,0.00],
[6.57,7.49,8.67,0.00,0.00],
[7.10,8.10,9.39,0.00,0.00],
[7.66,8.77,10.19,0.00,0.00],
[8.27,9.50,11.07,0.00,0.00],
[8.92,10.29,0.00,0.00,0.00],
[9.64,11.13,0.00,0.00,0.00],
[10.42,12.07,0.00,0.00,0.00],
[11.28,13.12,0.00,0.00,0.00],
[12.22,14.27,0.00,0.00,0.00],
[13.23,0.00,0.00,0.00,0.00],
[14.32,0.00,0.00,0.00,0.00],
[15.57,0.00,0.00,0.00,0.00],
[17.02,0.00,0.00,0.00,0.00],
[18.66,0.00,0.00,0.00,0.00]
];




/*
SA > 20 lac SMOKER
FOR SA < 20 LAC,,,,
">> TERM 10, 15,20,25,30 ------VVV age 18-60",,,,
*/


var ISecureSmokerRate = [
[1.36,1.37,1.40,1.44,1.47],
[1.36,1.37,1.40,1.45,1.49],
[1.37,1.38,1.41,1.47,1.51],
[1.39,1.40,1.42,1.48,1.53],
[1.40,1.41,1.43,1.49,1.55],
[1.42,1.43,1.44,1.50,1.58],
[1.43,1.44,1.46,1.52,1.63],
[1.44,1.45,1.48,1.56,1.70],
[1.45,1.47,1.52,1.62,1.78],
[1.47,1.50,1.56,1.68,1.87],
[1.49,1.53,1.61,1.76,1.97],
[1.52,1.58,1.67,1.85,2.08],
[1.56,1.63,1.75,1.95,2.21],
[1.61,1.70,1.84,2.07,2.36],
[1.67,1.78,1.95,2.21,2.52],
[1.74,1.87,2.07,2.36,2.71],
[1.82,1.98,2.21,2.53,2.91],
[1.92,2.10,2.37,2.72,3.14],
[2.17,2.41,2.74,3.16,3.65],
[2.31,2.59,2.96,3.41,3.95],
[2.47,2.78,3.20,3.69,4.28],
[2.65,3.00,3.46,4.00,4.64],
[2.84,3.25,3.74,4.34,5.05],
[3.07,3.52,4.05,4.71,0.00],
[3.31,3.81,4.40,5.12,0.00],
[3.59,4.14,4.78,5.57,0.00],
[3.90,4.50,5.21,6.07,0.00],
[4.25,4.89,5.67,6.63,0.00],
[4.72,5.39,6.24,0.00,0.00],
[5.13,5.86,6.80,0.00,0.00],
[5.57,6.37,7.41,0.00,0.00],
[6.05,6.93,8.08,0.00,0.00],
[6.56,7.55,8.82,0.00,0.00],
[7.12,8.22,0.00,0.00,0.00],
[7.73,8.95,0.00,0.00,0.00],
[8.39,9.76,0.00,0.00,0.00],
[9.13,10.65,0.00,0.00,0.00],
[9.94,11.65,0.00,0.00,0.00],
[10.82,0.00,0.00,0.00,0.00],
[11.78,0.00,0.00,0.00,0.00],
[12.87,0.00,0.00,0.00,0.00],
[14.12,0.00,0.00,0.00,0.00],
[15.52,0.00,0.00,0.00,0.00]
];




/*
 * PREMIUM RATE FOR ISECURE NON SMOKER
SA> 20 LAC NON-SMOKER
*/


var ISecureNonSmokerRate = [
[1.35,1.36,1.38,1.39,1.40],
[1.36,1.36,1.37,1.40,1.41],
[1.37,1.37,1.38,1.41,1.42],
[1.38,1.38,1.39,1.42,1.43],
[1.39,1.39,1.40,1.43,1.44],
[1.39,1.40,1.41,1.44,1.45],
[1.40,1.41,1.42,1.45,1.50],
[1.41,1.42,1.43,1.46,1.55],
[1.42,1.43,1.44,1.49,1.61],
[1.43,1.45,1.47,1.54,1.67],
[1.45,1.46,1.50,1.60,1.75],
[1.47,1.50,1.55,1.67,1.84],
[1.50,1.54,1.61,1.75,1.94],
[1.54,1.59,1.68,1.84,2.06],
[1.59,1.65,1.76,1.95,2.19],
[1.64,1.72,1.85,2.07,2.34],
[1.71,1.80,1.97,2.21,2.51],
[1.79,1.90,2.09,2.36,2.70],
[2.02,2.17,2.42,2.75,3.16],
[2.13,2.32,2.60,2.96,3.41],
[2.25,2.48,2.80,3.20,3.69],
[2.40,2.65,3.01,3.45,4.00],
[2.56,2.85,3.24,3.74,4.33],
[2.73,3.07,3.50,4.05,0.00],
[2.93,3.31,3.79,4.39,0.00],
[3.16,3.58,4.11,4.76,0.00],
[3.41,3.88,4.46,5.18,0.00],
[3.70,4.21,4.85,5.65,0.00],
[4.11,4.64,5.34,0.00,0.00],
[4.45,5.03,5.80,0.00,0.00],
[4.82,5.46,6.32,0.00,0.00],
[5.22,5.93,6.88,0.00,0.00],
[5.65,6.45,7.51,0.00,0.00],
[6.11,7.01,0.00,0.00,0.00],
[6.62,7.62,0.00,0.00,0.00],
[7.18,8.30,0.00,0.00,0.00],
[7.80,9.05,0.00,0.00,0.00],
[8.47,9.89,0.00,0.00,0.00],
[9.21,0.00,0.00,0.00,0.00],
[10.01,0.00,0.00,0.00,0.00],
[10.92,0.00,0.00,0.00,0.00],
[11.96,0.00,0.00,0.00,0.00],
[13.15,0.00,0.00,0.00,0.00]
];


/*
PREMIUM RATE FOR PREFFERED NON SMOKER SA> 20 LAC 



var ISecure20PNSmok = [
[1.31,1.32,1.33,1.35,1.36],
[1.32,1.33,1.33,1.36,1.38],
[1.34,1.34,1.35,1.37,1.39],
[1.34,1.35,1.36,1.38,1.40],
[1.35,1.36,1.37,1.39,1.41],
[1.36,1.37,1.38,1.40,1.43],
[1.36,1.38,1.39,1.42,1.45],
[1.37,1.38,1.40,1.43,1.50],
[1.38,1.39,1.41,1.45,1.55],
[1.39,1.40,1.42,1.49,1.62],
[1.41,1.42,1.45,1.54,1.69],
[1.43,1.45,1.50,1.61,1.77],
[1.46,1.49,1.55,1.68,1.87],
[1.50,1.53,1.62,1.77,1.98],
[1.54,1.59,1.69,1.87,2.10],
[1.59,1.66,1.79,1.99,2.25],
[1.66,1.74,1.89,2.12,2.40],
[1.73,1.83,2.01,2.26,2.58],
[1.95,2.10,2.34,2.65,3.04],
[2.06,2.23,2.50,2.85,3.27],
[2.18,2.39,2.69,3.07,3.54],
[2.31,2.56,2.89,3.31,3.83],
[2.46,2.74,3.12,3.58,4.15],
[2.63,2.95,3.36,3.88,0.00],
[2.82,3.18,3.63,4.20,0.00],
[3.04,3.44,3.93,4.56,0.00],
[3.28,3.72,4.27,4.96,0.00],
[3.55,4.03,4.64,5.40,0.00],
[3.94,4.44,5.11,0.00,0.00],
[4.27,4.82,5.55,0.00,0.00],
[4.62,5.23,6.04,0.00,0.00],
[5.00,5.68,6.58,0.00,0.00],
[5.41,6.17,7.17,0.00,0.00],
[5.85,6.70,0.00,0.00,0.00],
[6.33,7.28,0.00,0.00,0.00],
[6.86,7.92,0.00,0.00,0.00],
[7.45,8.63,0.00,0.00,0.00],
[8.09,9.42,0.00,0.00,0.00],
[8.78,0.00,0.00,0.00,0.00],
[9.54,0.00,0.00,0.00,0.00],
[10.40,0.00,0.00,0.00,0.00],
[11.39,0.00,0.00,0.00,0.00],
[12.50,0.00,0.00,0.00,0.00]
];

*/

