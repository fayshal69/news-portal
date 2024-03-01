const navBar = document.getElementById('nav-bar');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const newsCardContainer = document.getElementById('news-card-container');



//categories btn fetchig function
const handleNavCategoryBtn = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const {data} = await res.json();
    //sending the btns data to this function
    displayCategoryBtn(data.news_category);
}

// display the all caterory btns by this function
const displayCategoryBtn = (allCategoryBtn) => {
    let btns = '';
    allCategoryBtn.forEach(btn => {
        btns += `<button class="btn btn-outline bg-white" onclick="handleCategoryNews('${btn.category_id}')">${btn.category_name}</button>`;
    });
    navBar.innerHTML = `${btns}`;
}

// display the news cards on body
const handleCategoryNews = async(id, isTreading) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const {data} = await res.json();

    if(!isTreading) {
        displayCategoryNews(data);
    }
    else {
        sortTreadingNews(data);
    }
}

// const sortTreadingNews = (allNews) => { console.log(allNews);
//     const treadingNews = allNews.filter((news) => news.others_info.is_trending === true);
//     displayCategoryNews(treadingNews);
// }

// const treading = () => { 
//     const id = '08';
//     const isTreading = true;
//     handleCategoryNews(id, isTreading);
// }

const displayCategoryNews = (newsCards) => {
    newsCardContainer.innerHTML = '';
    newsCards.forEach((card) => { 
        const cardDetails = card.details.slice(0, 200);
        const newCard = document.createElement('div');
        newCard.classList = `card lg:card-side bg-base-100 shadow-xl h-[400px]`;
        newCard.innerHTML = `
        <figure class="w-[55%]"><img src="${card.image_url}" class="w-full h-full object-cover" alt="Album"/></figure>
                <div class="p-8 w-[45%]">
                  <div class="flex justify-between items-start mb-6">
                    <h2 class="card-title w-[75%]">${card.title}</h2>
                    <div class="text-right">
                        <p class="text-sm mb-2">${card?.rating?.number || ''}</p>
                        <h5 class="text-lg font-medium">${card?.rating?.badge || ''}</h5>
                    </div>
                  </div>
                  <p class="font-medium opacity-70">${cardDetails} ...</p>
                  <div class="flex justify-between items-center mt-16">
                    <!-- left container -->
                    <div class="flex items-center gap-3">
                        <div>
                            <img src="${card.author.img}" alt="icon" class="size-14 object-cover rounded-full">
                        </div>
                        <div>
                            <p>${card.author.name}</p>
                            <p>Date: ${card.author.published_date}</p>
                        </div>
                    </div>
                    <!-- right container -->
                    <div class="space-x-6">
                        <span><i class="fa-regular fa-eye mr-1"></i> ${card.total_view}</span>
                        <button class="btn btn-active btn-ghost" onclick="showNewsDetails('${card._id}')">Details</button>
                    </div>
                  </div>
                </div>
        `;
        newsCardContainer.appendChild(newCard);
    });
}

//click the search btn function
searchBtn.addEventListener('click', () => {
    const searchInputText = searchInput.value;
    const idArray = ['01', '02', '03', '04', '05', '06', '07', '08'];
    searchInput.value = '';
    if(searchInputText.trim() === '' || !idArray.includes(searchInputText)) {
        alert("Enter a valid category between 01 to 08!");
    }
    else {
        handleCategoryNews(searchInputText);
    }
});

handleCategoryNews('01');

handleNavCategoryBtn();