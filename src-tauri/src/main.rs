// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env, fs::File, path::PathBuf};

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_settings() -> String {
    let home_dir = match env::var("HOME") {
        Ok(v) => v,
        Err(e) => panic!("${} is not set ()", e),
    };

    let file_path = PathBuf::from(format!("{}/.signal/settings.json", home_dir));

    let file = match File::open(&file_path) {
        Err(why) => panic!("couldn't open {}: {}", file_path.display(), why),
        Ok(file) => file,
    };

    let content: serde_json::Value = serde_json::from_reader(file).unwrap();

    return format!("{}", content);
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
