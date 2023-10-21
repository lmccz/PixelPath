export const approach = (current, target, dt) =>
{
	if (target > current)
	{
		current += dt;
		if (current > target)
		{
			return target;
		};

		return current;
	};

	if (target < current)
	{
		current -= dt;
		if (current < target)
		{
			return target;
		};
		return current;
	};

	return target;
}