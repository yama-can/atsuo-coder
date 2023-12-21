export interface Contest {

	id: string;
	name: string;
	problems: string[];

	public: boolean;

	editor: string[];
	tester: string[];

	rated: string;

	rated_users: string[];
	unrated_users: string[];

	start: number;
	period: number;

	description: string;

}

export interface Task {

	name: string;
	id: string;
	question: string;
	judge_type: number;
	editor: string[];
	tester: string[];
	score: number;

}
