module.exports = {
    async index(ctx, next) {
        const {id} = ctx.params;
        const user_id = ctx.state.user.id;
        const post = await strapi.query('api::posts.posts').findOne({ 
            where: { id: id },
            populate: { likes: true }
         }); 
        const likeList = post.likes.map(u=>u.id);
        let likeArray;
        if (likeList.includes(user_id)) {
            likeArray = likeList.filter(uid=>uid!==user_id);
            await strapi.query('api::posts.posts').update({
                where: { id: id },
                data: {
                    likes: likeList.filter(uid=>uid!==user_id)
                },
                populate: { likes: true }
            })
        }else{
            likeArray = [...likeList,user_id];
            await strapi.query('api::posts.posts').update({
                where: { id: id },
                data: {
                    likes: [...likeList,user_id]
                },
                populate: { likes: true }
            })
        }
        ctx.body = likeArray; // we could also send a JSON
    },
};