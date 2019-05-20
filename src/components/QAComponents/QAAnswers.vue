<template>
  <div class="qa_answers">
    <div class="qa_subtitle caption">Ответы</div>

    <article class="comment" data-id="8">
      <div class="comment_body">
        <div class="comment_text">
          Тестовый ответ </div>

        <div class="comment_details">
          <div class="user comment_author">
            <div class="user_photo avatar">
              <img src="http://2.gravatar.com/avatar/5eb37376a348cbb324c93a1c5dee5b1b?s=96&amp;d=mm&amp;r=g" alt="">
            </div>

            <div class="user_info">
              <a href="#" class="user_name">Юрий Апретов</a>
              <div class="user_details">
                <li>
                  3 апреля </li>

                <li>
                  <a href="#" class="comment_reply_link" data-post-id="47" data-parent="8">Комментировать</a>
                </li>
              </div>
            </div>
          </div>

          <div class="comment_rating rating" data-entry-id="8" data-entry-type="comment"> <button class="rating_control rating_control-decrease rating_control-selected"></button>
            <div class="rating_counter">0</div> <button class="rating_control rating_control-increase"></button></div>
        </div>
      </div>

      <div class="comment_reply_form">
        <form class="comment_form form" data-action="add_comment">
          <input type="hidden" name="post_id" value="47">
          <input type="hidden" name="parent" value="8">

          <div class="textfield textfield-block">
            <textarea rows="2" class="textfield_input" placeholder=" " name="text" required=""></textarea>
            <div class="textfield_label">Напишите свой комментарий</div>
          </div>

          <div class="comment_form_controls">
            <div class="comment_form_user avatar">
              <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
            </div>

            <div class="comment_form_buttons">
              <button type="submit" class="button button-small button-primary">Комментировать</button>
            </div>
          </div>
        </form>
      </div>

      <div class="comment_replies">
        <article class="comment comment-small" data-id="9">
          <div class="comment_body">
            <div class="comment_text">
              <span class="comment_sendto">Юрий Апретов</span>, test </div>

            <div class="comment_details">
              <div class="user user-small comment_author">
                <div class="user_photo avatar">
                  <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
                </div>

                <div class="user_info">
                  <a href="#" class="user_name">Разработчик Девелоперович</a>
                  <ul class="user_details">
                    <li>
                      4 апреля </li>

                    <li>
                      <a href="#" class="comment_reply_link" data-post-id="47" data-parent="8">Комментировать</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="comment_rating rating rating-small" data-entry-id="9" data-entry-type="comment"> <button class="rating_control rating_control-decrease"></button>
                <div class="rating_counter">0</div> <button class="rating_control rating_control-increase"></button></div>
            </div>
          </div>

          <div class="comment_reply_form">
            <form class="comment_form form" data-action="add_comment">
              <input type="hidden" name="post_id" value="47">
              <input type="hidden" name="parent" value="8">

              <div class="textfield textfield-block">
                <textarea rows="2" class="textfield_input" placeholder=" " name="text" required=""></textarea>
                <div class="textfield_label">Напишите свой комментарий</div>
              </div>

              <div class="comment_form_controls">
                <div class="comment_form_user avatar">
                  <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
                </div>

                <div class="comment_form_buttons">
                  <button type="submit" class="button button-small button-primary">Комментировать</button>
                </div>
              </div>
            </form>
          </div>
        </article>

        <article class="comment comment-small" data-id="10">
          <div class="comment_body">
            <div class="comment_text">
              <span class="comment_sendto">Юрий Апретов</span>, test2 </div>

            <div class="comment_details">
              <div class="user user-small comment_author">
                <div class="user_photo avatar">
                  <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
                </div>

                <div class="user_info">
                  <a href="#" class="user_name">Разработчик Девелоперович</a>
                  <ul class="user_details">
                    <li>
                      4 апреля </li>

                    <li>
                      <a href="#" class="comment_reply_link" data-post-id="47" data-parent="8">Комментировать</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="comment_rating rating rating-small" data-entry-id="10" data-entry-type="comment"> <button class="rating_control rating_control-decrease"></button>
                <div class="rating_counter">0</div> <button class="rating_control rating_control-increase"></button></div>
            </div>
          </div>
        </article>
      </div>

    </article>
  </div>
</template>

<script>
  export default {
    name: 'qa-answers'
  }
</script>