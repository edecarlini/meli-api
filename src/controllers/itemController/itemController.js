const axios = require('axios');
require('dotenv').config();

let cachedCategories = [];

const getUserInfo = async (sellerId) => {
    try {
        const response = await axios.get(`${process.env.MERCADOLIBRE_API_URL}/users/${sellerId}`);
        const userData = response.data;

        return {
            id: userData.id,
            nickname: userData.nickname,
            country_id: userData.country_id,
            address: userData.address,
            seller_reputation: userData.seller_reputation
        };
    } catch (error) {
        console.error('Error fetching user details from Mercado Libre:', error);
        return null;
    }
};

const getItems = async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`${process.env.MERCADOLIBRE_API_URL}/sites/MLA/search?q=${query}`);
        const items = await Promise.all(response.data.results.slice(offset, offset + limit).map(async (item) => {
            const sellerInfo = await getUserInfo(item.seller.id);
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: item.price,
                    decimals: 2
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                seller: item.seller.id,
                location: sellerInfo
            };
        }));

        cachedCategories = [];
        const categoryFilter = response?.data?.filters.find(filter => filter.id === "category");
        const brandFilter = response?.data?.filters.find(filter => filter.id === "BRAND");

        if (categoryFilter) {
            const pathFromRoot = categoryFilter.values[0]?.path_from_root?.map(category => category.name);
            if (pathFromRoot) {
                cachedCategories = [...pathFromRoot];
            }
        }

        if (brandFilter) {
            cachedCategories.push(brandFilter.values[0]?.name);
        }

        res.json({
            author: {
                name: "Exequiel",
                lastname: "De Carlini"
            },
            categories: cachedCategories,
            items,
            pagination: {
                page,
                limit,
                total: response.data.paging.total
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching items from Mercado Libre' });
    }
};

const getItemById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
    }

    try {
        const [itemResponse, descriptionResponse] = await Promise.all([
            axios.get(`${process.env.MERCADOLIBRE_API_URL}/items/${id}`),
            axios.get(`${process.env.MERCADOLIBRE_API_URL}/items/${id}/description`)
        ]);

        const itemData = itemResponse.data;
        const descriptionData = descriptionResponse.data;

        res.json({
            author: {
                name: "Exequiel",
                lastname: "De Carlini"
            },
            categories: cachedCategories,
            item: {
                id: itemData.id,
                title: itemData.title,
                price: {
                    currency: itemData.currency_id,
                    amount: itemData.price,
                    decimals: 2
                },
                picture: itemData.pictures[0]?.url || '',
                condition: itemData.condition,
                free_shipping: itemData.shipping.free_shipping,
                sold_quantity: itemData.attributes.sold_quantity,
                description: descriptionData.plain_text
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching item details from Mercado Libre' });
    }
};

module.exports = {
    getItems,
    getItemById,
    getUserInfo
};
