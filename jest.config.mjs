export default {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.jsx?$": "babel-jest",
	},
	extensionsToTreatAsEsm: [".jsx"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
