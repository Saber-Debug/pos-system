const [summary, setSummary] = useState(null);

useEffect(() => {
  API.get('/dashboard/summary')
    .then(res => setSummary(res.data))
    .catch(err => console.error(err));
}, []);

