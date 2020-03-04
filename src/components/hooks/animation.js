import React, { useEffect, useState } from 'react';

const useAnimation = (delay = 75) => {
	const [animate, setAnimate] = useState(true);

	useEffect(() => {
		setTimeout(() => setAnimate(false), delay);
	}, []);

	return animate;
}

export default useAnimation;