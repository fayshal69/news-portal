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
const handleCategoryNews = async(id = '01') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const {data} = await res.json();
    displayCategoryNews(data);
}

const displayCategoryNews = (newsCards) => {
    newsCardContainer.innerHTML = '';
    newsCards.forEach((card) => {
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
                  <p class="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quasi architecto sint eveniet tempora minima eos ipsum iure magni temporibus error, vitae aut sed molestias dolores quis ad consequuntur dolorem.</p>
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

const showNewsDetails = (id) => {
    console.log(id);
}

handleCategoryNews();

handleNavCategoryBtn();