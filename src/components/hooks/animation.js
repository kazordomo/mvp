import React, { useEffect, useState } from 'react';

const useAnimation = (delay = 75) => {
	const [animate, setAnimate] = useState(true);
	const [activeTimeout, setActiveTimeout] = useState(null);

	useEffect(() => {
		setActiveTimeout(setTimeout(() => setAnimate(false), delay));

		return () => setActiveTimeout(null);
	}, []);

	return animate;
}

export default useAnimation;