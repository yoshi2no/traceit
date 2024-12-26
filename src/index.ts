#!/usr/bin/env node

import { Project, SyntaxKind } from "ts-morph";
import fs from "node:fs";

function addConsoleLogToFunctions(filePath: string): void {
	const project = new Project();
	const sourceFile = project.addSourceFileAtPath(filePath);

	sourceFile.forEachDescendant((node) => {
		if (
			node.getKind() === SyntaxKind.FunctionDeclaration ||
			node.getKind() === SyntaxKind.MethodDeclaration ||
			node.getKind() === SyntaxKind.FunctionExpression ||
			node.getKind() === SyntaxKind.ArrowFunction
		) {
			const body = node.getFirstChildByKind(SyntaxKind.Block);
			if (body) {
				let functionName = "";
				switch (node.getKind()) {
					case SyntaxKind.MethodDeclaration:
						functionName = node.isKind(SyntaxKind.MethodDeclaration)
							? node.getName()
							: "<anonymous>";
						break;
					case SyntaxKind.FunctionDeclaration:
						functionName = node.isKind(SyntaxKind.FunctionDeclaration)
							? node.getName() || "<anonymous>"
							: "<anonymous>";
						break;
				}
				const template = `console.log("⭐️[DEBUG] ${functionName}");`;
				// 0番目のconsole.logが存在する場合は上書き
				if (
					body.getStatements().length > 0 &&
					body.getStatements()[0]?.getKind() ===
						SyntaxKind.ExpressionStatement &&
					body.getStatements()[0]?.getText().includes("console.log")
				) {
					body.getStatements()[0]?.remove();
					body.insertStatements(0, template);
				} else {
					body.insertStatements(0, template);
				}
			}
		}
	});

	fs.writeFileSync(filePath, sourceFile.getFullText());
}

// コマンドライン引数からファイルパスを取得
const args = process.argv.slice(2);
if (args.length === 0) {
	console.error("Usage: add-console-log <file>");
	process.exit(1);
}

const filePath = args[0];
if (filePath) {
	addConsoleLogToFunctions(filePath);
	console.log(`Console.log statements added to ${filePath}`);
} else {
	console.error("Usage: add-console-log <file>");
	process.exit(1);
}
