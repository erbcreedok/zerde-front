<template>
    <div class="wrap">
        <button class="bSearch_filters_toggle button button-block button-outline button-primary button-icon button-icon-left button-icon-filter">Параметры поиска</button>

        <div class="bSearch">
            <form class="bSearch_filters">
                <div class="bSearch_filters_section">
                    <div class="textfield textfield-block">
                        <input type="text" class="qa_search_field textfield_input" placeholder=" ">
                        <label class="textfield_label">Поиск по названию</label>
                    </div>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Тема</div>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Старт бизнеса</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Операционка</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Персонал</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Финансы</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Маркетинг</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Продажи</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Личная эффективность</span>
                    </label>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Формат</div>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Видео</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Текст</span>
                    </label>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Сортировка</div>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="" checked>
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По рейтингу</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По просмотрам</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По дате добавления</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По комментариям</span>
                    </label>
                </div>

                <div class="bSearch_filters_section">
                    <button type="submit" class="bSearch_filters_submit button button-primary button-block">Применить</button>

                    <label class="bSearch_filters_thumbler">
						<span class="checkbox">
							<input type="checkbox" name="" value="" checked="">
							<span class="checkbox_toggle"></span>
						</span>
                        <span>
							Показывать рекомендованные материалы со сторонних ресурсов
						</span>
                    </label>
                </div>
            </form>
            <div class="overlay"></div>

            <main class="bSearch_results blog_grid-static">
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>


                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
                <article class="blogcard blogcard-h">
                    <div class="blogcard_cover">
                        <img src="http://placehold.it/500x500" alt="">
                        <div class="blogcard_type">Статья</div>
                        <div class="blogcard_icons">
                            <span class="blogcard_icon blogcard_icon-external"></span>
                        </div>
                    </div>

                    <div class="blogcard_wrap">
                        <div class="blogcard_category">Личная эффективность</div>
                        <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                        <ul class="blog_stats blogcard_stats">
                            <li class="blog_stat blog_stat-rating">13</li>
                            <li class="blog_stat blog_stat-comments">1</li>
                            <li class="blog_stat blog_stat-bookmarks">12</li>
                        </ul>
                    </div>
                </article>
            </main>
        </div>
    </div>
</template>
