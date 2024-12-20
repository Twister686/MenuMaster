import React, {useState} from "react";
import {Link} from "react-router-dom";
import {usePlan} from "../Contexts/PlanContext";

const Pricing = () => {
	const [isMonthly, setIsMonthly] = useState(false);
	const {setSelectedPlan} = usePlan();

	const pricingPlans = [
		{
			title: "Intro",
			price: 19,
			description:
				"For most businesses that want to optimize web queries.",
		},
		{
			title: "Base",
			price: 39,
			description: "For businesses looking for essential features.",
		},
		{
			title: "Popular",
			price: 99,
			description: "For businesses that want advanced capabilities.",
		},
		{
			title: "Enterprise",
			price: 199,
			description:
				"For large organizations needing comprehensive solutions.",
		},
	];

	const handlePlanSelection = (plan) => {
		setSelectedPlan(plan); // Set the selected plan in the context
		console.log("Selected plan:", plan); // Debugging to confirm
	};

	return (
		<section id="pricing" className="bg-white dark:bg-gray-800  mt-34">
			<div className="container bg-wh px-6 py-8 mx-auto">
				<div className="sm:flex flex-col sm:items-center justify-center">
					<div>
						<h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
							Simple, transparent pricing
						</h2>
					</div>

					<div className="overflow-hidden p-0.5 mt-6 border rounded-lg dark:border-gray-700">
						<div className="sm:-mx-0.5 flex">
							<button
								className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 ${
									isMonthly
										? "bg-blue-500 text-white "
										: "bg-white text-black  dark:text-gray-200"
								} rounded-lg`}
								onClick={() => setIsMonthly(true)}
							>
								Monthly
							</button>
							<button
								className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 ${
									!isMonthly
										? "bg-blue-500 text-white"
										: "bg-white text-black  dark:text-gray-200"
								} rounded-lg`}
								onClick={() => setIsMonthly(false)}
							>
								Annualy
							</button>
						</div>
					</div>
				</div>

				<div className="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
					{pricingPlans.map((plan, index) => (
						<div
							key={index}
							className="px-6 py-4 transition-colors duration-200 transform rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:hover:bg-gray-600 dark:bg-gray-700"
						>
							<div className="flex justify-between">
								<p className="text-lg font-medium text-gray-800 dark:text-gray-100">
									{plan.title}
								</p>
								{!isMonthly && (
									<p className="underline text-primary">
										Save {plan.price}$
									</p>
								)}
							</div>

							<div>
								<h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
									$
									{isMonthly
										? plan.price
										: plan.price * 12 - plan.price}{" "}
									<span className="text-base font-normal text-gray-600 dark:text-gray-400">
										{isMonthly ? "/Monthly" : "/Annualy"}
									</span>
								</h4>
							</div>

							<p className="mt-4 text-gray-500 dark:text-gray-300">
								{plan.description}
							</p>

							<div className="mt-8 space-y-8">
								<FeatureItem feature="All limited links" />
								<FeatureItem feature="Own analytics platform" />
								<FeatureItem feature="Chat support" />
								<FeatureItem feature="Optimize hashtags" />
								<FeatureItem feature="Unlimited users" />
							</div>

							<Link to="/register" state={{selectedPlan: plan}}>
								<button
									onClick={() => {
										handlePlanSelection(plan);
									}}
									className="w-full btn btn-primary px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none focus:bg-blue-600"
								>
									Choose Plan
								</button>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const FeatureItem = ({feature}) => (
	<div className="flex items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-5 h-5 text-blue-500"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
		<span className="mx-4 text-gray-700 dark:text-gray-300">{feature}</span>
	</div>
);

export default Pricing;
