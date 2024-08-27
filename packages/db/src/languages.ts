const languages_json = [
    {
    id: 1,
    name: "C++ (Clang 7.0.1)",
    is_archived: false,
    source_file: "main.cpp",
    compile_cmd: "/usr/bin/clang++-7 %s main.cpp",
    run_cmd: "./a.out",
  },
  {
    id: 2,
    name: "Python (3.8.1)",
    is_archived: false,
    source_file: "script.py",
    run_cmd: "/usr/local/python-3.8.1/bin/python3 script.py",
  },
]


export default languages_json;