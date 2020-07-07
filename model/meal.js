const meal = {
    fakeData: [],

    initDB(){
        this.fakeData.push({
            title: "Pasta",
            price: 7,
            topMeal: false,
            imgPath: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            desc: "pasta from Mexico"
        });
        this.fakeData.push({
            title: "Dhokla",
            price: 17,
            topMeal: true,
            imgPath: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: "Special dhokla from rice"
        });
        this.fakeData.push({
            title: "Salad",
            price: 12,
            topMeal: true,
            imgPath: "https://images.pexels.com/photos/750075/pexels-photo-750075.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: "Salad with world's best chef and best incredians"
        });
        this.fakeData.push({
            title: "Biryani",
            price: 20,
            topMeal: false,
            imgPath: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: "Pakistani Chiken Biryani avaiable with special 'chutney' "
        });
        this.fakeData.push({
            title: "Rabdi",
            price: 18,
            topMeal: true,
            imgPath: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: "Rabdi out of milk"
        });
        this.fakeData.push({
            title: "",
            price: 18,
            topMeal: false,
            imgPath: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: ""
        });
        
        this.fakeData.push({
            title: "Frankie",
            price: 18,
            topMeal: true,
            imgPath: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: ""
        });
        
        this.fakeData.push({
            title: "South Indian Special",
            price: 18,
            topMeal: true,
            imgPath: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: ""
        });
        
        this.fakeData.push({
            title: "Noodles",
            price: 18,
            topMeal: false,
            imgPath: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: ""
        });
        
        this.fakeData.push({
            title: "Sushi",
            price: 18,
            topMeal: true,
            imgPath: "https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: ""
        });
        
        this.fakeData.push({
            title: "Fries",
            price: 18,
            topMeal: false,
            imgPath: "https://images.pexels.com/photos/1583891/pexels-photo-1583891.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            desc: ""
        });
    },


    getAllMeals(){
        return this.fakeData;
    },

    getTopMeal(){
        let result = this.fakeData.filter(meal => meal.topMeal);
        return result;
    }



}


meal.initDB();
module.exports = meal;