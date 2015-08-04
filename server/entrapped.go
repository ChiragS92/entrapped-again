package entrapped

import (
	"github.com/SKatiyar/entrapped/Godeps/_workspace/src/github.com/julienschmidt/httprouter"
	"net/http"
)

const (
	size     int = 7
	numBombs int = 10
	lifes    int = 5
)

func Start(addr string) {
	if len(addr) == 0 {
		addr = ":7000"
	}

	// initialize hunt
	go ch.run()

	// initialize router
	router := httprouter.New()

	// file routes
	router.GET("/", home)
	router.ServeFiles("/statics/*filepath", http.Dir("client/dist/statics"))

	// socket route
	router.GET("/players/:id", addPlayer)

	// start listening to incoming connections
	listenErr := http.ListenAndServe(addr, router)
	if listenErr != nil {
		logger.Println(listenErr)
		return
	}
}

func addPlayer(rw http.ResponseWriter, req *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	ws, wsErr := upgrader.Upgrade(rw, req, nil)
	if wsErr != nil {
		logger.Println(wsErr)
		return
	}

	trap := makeTrap(size, numBombs, lifes)

	ch.add(&trooper{id, trap, ws, make(chan []byte, 512)})
}

func home(rw http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	rw.Header().Set("Content-Type", "text/html; charset=utf-8")
	http.ServeFile(rw, req, "client/dist/index.html")
}
