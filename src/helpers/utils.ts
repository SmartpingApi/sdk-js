export function booleanToNumber(value: boolean) {
	return value ? 1 : 0;
}

const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

export function computePoints(
	points: string | undefined,
): [points: number, nationalRank: number | undefined] {
	if (points === undefined) {
		return [0, undefined];
	}

	if (points.startsWith('N')) {
		const [_rank, _points] = points.split(' - ');
		const nationalRank = _rank ? Number(_rank.slice(2)) : undefined;
		const officialPoints = _points ? Number(_points) : 0;

		return [officialPoints, nationalRank];
	}

	return [Number(points), undefined];
}

export function computeScore(score: string | undefined) {
	const detail: Record<string, number> = {};

	if (score === undefined) {
		return detail;
	}

	let originalScore = score;

	for (const letter of alphabet) {
		const charIndex = originalScore.indexOf(letter);
		// eslint-disable-next-line unicorn/prefer-string-slice
		const letterScore = originalScore.substring(0, charIndex);

		if (letterScore === '') {
			continue;
		}

		detail[letter] = Number(letterScore);
		originalScore = originalScore.slice(charIndex + 1);
	}

	return detail;
}
