const navBar = document.getElementById('nav-bar');




const handleNavCategoryBtn = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const {data} = await res.json();
    displayCategoryBtn(data.news_category);
}

const displayCategoryBtn = (allCategoryBtn) => {
    let btns = '';
    allCategoryBtn.forEach(btn => {
        btns += `<button class="btn btn-outline bg-white" onclick="displayCategoryNews('${btn.category_id}')">${btn.category_name}</button>`;
    });
    navBar.innerHTML = `${btns}`;
}

const displayCategoryNews = (id) => {
    console.log(id);
}

handleNavCategoryBtn();