import axios from 'axios';

const base = 'localhost:8080';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const getHeaders = () => {
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': axios.defaults.headers.common['Authorization']
	};
	return headers; 
};

/**
 * Donor Create
 * @param {object} body {
 *  name,
	email,
	cpf,
	birth_date,
	donation_interval,
	phone_number,
	public_place,
	number,
	zip_code,
	complement: ,
	city,
	state,
	created_at
 * }
 */

const create = (donor) => {
	return axios.post(`${base}/donors`, donor, config);
};

const list = () => {
	return axios.get(`${base}/donors`, getHeaders());
};

export {
	create, 
	list
};